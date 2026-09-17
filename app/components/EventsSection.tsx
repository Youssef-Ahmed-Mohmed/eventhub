"use client";

import { motion } from "framer-motion";
import EventCard from "./EventCard";

const events = [
    {
        title: "Tech Summit 2026",
        category: "Technology",
        date: "October 24, 2026",
        location: "Cairo, Egypt",
        attendees: "1,284",
        gradient:
            "bg-gradient-to-br from-purple-600/80 via-blue-600/50 to-black",
    },
    {
        title: "Design Forward",
        category: "Design",
        date: "November 08, 2026",
        location: "Alexandria, Egypt",
        attendees: "842",
        gradient:
            "bg-gradient-to-br from-pink-600/70 via-purple-600/40 to-black",
    },
    {
        title: "Future AI",
        category: "Artificial Intelligence",
        date: "December 15, 2026",
        location: "Dubai, UAE",
        attendees: "2,430",
        gradient:
            "bg-gradient-to-br from-cyan-500/70 via-blue-600/40 to-black",
    },
];

export default function EventsSection() {
    return (
        <section className="relative bg-[#050505] px-8 py-32">

            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
                >

                    <div>
                        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-400">
                            Discover
                        </p>

                        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                            Upcoming events
                        </h2>
                    </div>

                    <button className="w-fit rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white">
                        View all events →
                    </button>

                </motion.div>

                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                            }}
                        >
                            <EventCard {...event} />
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}