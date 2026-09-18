"use client";

import { motion } from "framer-motion";
import {
    Coffee,
    Mic2,
    Presentation,
    Users,
} from "lucide-react";

const sessions = [
    {
        time: "09:00 AM",
        title: "Registration & Networking",
        description: "Meet other attendees and get ready for the event.",
        icon: Users,
    },
    {
        time: "10:30 AM",
        title: "Opening Keynote",
        description: "Discover the ideas and technologies shaping the future.",
        icon: Mic2,
    },
    {
        time: "01:00 PM",
        title: "Networking Lunch",
        description: "Connect, share ideas, and build new relationships.",
        icon: Coffee,
    },
    {
        time: "03:00 PM",
        title: "Future of Technology",
        description: "A deep dive into the next generation of digital experiences.",
        icon: Presentation,
    },
];

export default function EventTimeline() {
    return (
        <section className="relative overflow-hidden bg-[#050505] px-8 py-32">
            <div className="mx-auto max-w-5xl">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-20 text-center"
                >
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
                        The experience
                    </p>

                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        One day. Endless moments.
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-gray-400">
                        Follow the event from the first connection to the final session.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">

                    {/* Background Line */}
                    <div className="absolute left-5 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />

                    {/* Animated Line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-400 via-sky-400 to-blue-400 md:left-1/2 md:-translate-x-1/2"
                    />

                    {/* Sessions */}
                    <div className="space-y-16">
                        {sessions.map((session, index) => {
                            const Icon = session.icon;
                            const isRight = index % 2 !== 0;

                            return (
                                <motion.div
                                    key={session.title}
                                    initial={{
                                        opacity: 0,
                                        x: isRight ? 60 : -60,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.1,
                                    }}
                                    className="relative grid md:grid-cols-2"
                                >

                                    {/* Desktop left side */}
                                    <div
                                        className={`hidden md:block ${isRight ? "order-1" : "order-1 text-right"
                                            }`}
                                    >
                                        {!isRight && (
                                            <TimelineContent
                                                session={session}
                                                Icon={Icon}
                                                align="right"
                                            />
                                        )}
                                    </div>

                                    {/* Center point */}
                                    <div className="absolute left-5 top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-400/40 bg-[#080808] text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.25)] md:left-1/2">
                                        <Icon size={17} />
                                    </div>

                                    {/* Desktop right side */}
                                    <div
                                        className={`hidden md:block ${isRight ? "order-2" : "order-2"
                                            }`}
                                    >
                                        {isRight && (
                                            <TimelineContent
                                                session={session}
                                                Icon={Icon}
                                                align="left"
                                            />
                                        )}
                                    </div>

                                    {/* Mobile */}
                                    <div className="pl-14 md:hidden">
                                        <TimelineContent
                                            session={session}
                                            Icon={Icon}
                                            align="left"
                                        />
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}

function TimelineContent({
    session,
    Icon,
    align,
}: {
    session: (typeof sessions)[number];
    Icon: React.ElementType;
    align: "left" | "right";
}) {
    return (
        <div
            className={`max-w-md ${align === "right" ? "ml-auto pr-12" : "pl-12"
                }`}
        >
            <span className="text-sm font-medium text-cyan-400">
                {session.time}
            </span>

            <h3 className="mt-2 text-2xl font-bold text-white">
                {session.title}
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
                {session.description}
            </p>
        </div>
    );
}