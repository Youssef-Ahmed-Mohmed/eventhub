"use client";

import { motion } from "framer-motion";
import {
    QrCode,
    Armchair,
    Activity,
    Check,
} from "lucide-react";

const features = [
    {
        icon: QrCode,
        title: "Instant QR Check-in",
        description:
            "Scan attendee tickets instantly and keep your event moving.",
    },
    {
        icon: Armchair,
        title: "Smart Seat Map",
        description:
            "Let attendees choose their seats with a simple interactive map.",
    },
    {
        icon: Activity,
        title: "Live Attendance",
        description:
            "Watch attendance numbers update in real time as guests arrive.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="relative overflow-hidden bg-[#050505] px-8 py-32">
            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto mb-16 max-w-2xl text-center"
                >
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
                        Built for modern events
                    </p>

                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        Everything you need
                    </h2>

                    <p className="mt-5 leading-7 text-gray-400">
                        From registration to check-in, manage every part
                        of your event from one powerful platform.
                    </p>
                </motion.div>

                {/* Features */}
                <div className="grid gap-6 md:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                }}
                                whileHover={{ y: -10 }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
                            >
                                {/* Glow */}
                                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-500/20" />

                                {/* Icon */}
                                <motion.div
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                    }}
                                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300"
                                >
                                    <Icon size={25} />
                                </motion.div>

                                <h3 className="relative mt-7 text-2xl font-bold text-white">
                                    {feature.title}
                                </h3>

                                <p className="relative mt-4 leading-7 text-gray-400">
                                    {feature.description}
                                </p>

                                <div className="relative mt-8 flex items-center gap-2 text-sm text-gray-500">
                                    <Check size={16} className="text-cyan-400" />
                                    Real-time experience
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}