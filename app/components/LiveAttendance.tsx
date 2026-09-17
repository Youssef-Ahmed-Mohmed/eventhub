"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Users } from "lucide-react";

export default function LiveAttendance() {
    const [attendance, setAttendance] = useState(1284);

    useEffect(() => {
        const interval = setInterval(() => {
            setAttendance((current) => current + Math.floor(Math.random() * 4));
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#050505] px-8 py-32">
            <div className="mx-auto max-w-5xl">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 text-center"
                >
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-400">
                        Real-time analytics
                    </p>

                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        The room is filling up
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-gray-400">
                        Watch attendance update live as guests check in.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-12"
                >

                    {/* Glow */}
                    <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />

                    <div className="relative">

                        {/* Live indicator */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
                                </span>

                                <span className="text-sm font-medium text-gray-300">
                                    LIVE
                                </span>
                            </div>

                            <Activity size={20} className="text-purple-400" />
                        </div>

                        {/* Counter */}
                        <div className="mt-12 text-center">

                            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                                Current attendance
                            </p>

                            <motion.div
                                key={attendance}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-5 text-7xl font-bold tracking-tight text-white md:text-8xl"
                            >
                                {attendance.toLocaleString("en-US")}
                            </motion.div>

                            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                                <Users size={18} />
                                people checked in
                            </div>

                        </div>

                        {/* Progress */}
                        <div className="mx-auto mt-12 max-w-2xl">

                            <div className="mb-3 flex justify-between text-sm">
                                <span className="text-gray-500">
                                    Venue capacity
                                </span>

                                <span className="text-white">
                                    64%
                                </span>
                            </div>

                            <div className="h-3 overflow-hidden rounded-full bg-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "64%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                                />
                            </div>

                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}