"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[#050505] px-8 pt-32">

            {/* Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.25, 0.4, 0.25],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]"
            />

            <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

                {/* LEFT SIDE */}
                <div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md"
                    >
                        <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
                        The future of events
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="max-w-3xl text-6xl font-bold leading-tight tracking-tight text-white md:text-7xl"
                    >
                        Create events
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            people remember.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-6 max-w-xl text-lg leading-8 text-gray-400"
                    >
                        Plan, manage, and experience unforgettable events
                        with one powerful platform built for organizers and attendees.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-8 flex flex-wrap gap-4"
                    >
                        <Link
                            href="/events"
                            className="group flex items-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
                        >
                            Explore Events

                            <ArrowRight
                                size={18}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/dashboard/events"
                            className="rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
                        >
                            Create an Event
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.7 }}
                        className="mt-12 flex gap-10"
                    >
                        <div>
                            <p className="text-2xl font-bold text-white">12K+</p>
                            <p className="mt-1 text-sm text-gray-500">Attendees</p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-white">350+</p>
                            <p className="mt-1 text-sm text-gray-500">Events</p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-white">98%</p>
                            <p className="mt-1 text-sm text-gray-500">Satisfaction</p>
                        </div>
                    </motion.div>

                </div>

                {/* RIGHT SIDE */}
                <div className="relative hidden h-[550px] lg:block">

                    {/* Main Event Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.3,
                            type: "spring",
                        }}
                        className="absolute left-10 top-16 w-[400px] rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl"
                    >

                        <div className="mb-6 flex items-center justify-between">
                            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
                                FEATURED EVENT
                            </span>

                            <span className="text-sm text-gray-500">
                                24 OCT
                            </span>
                        </div>

                        <div className="mb-6 h-48 rounded-2xl bg-gradient-to-br from-purple-600/40 via-blue-600/20 to-transparent" />

                        <h2 className="text-2xl font-bold text-white">
                            Tech Summit 2026
                        </h2>

                        <div className="mt-4 space-y-3 text-sm text-gray-400">

                            <div className="flex items-center gap-3">
                                <Calendar size={17} />
                                October 24, 2026
                            </div>

                            <div className="flex items-center gap-3">
                                <MapPin size={17} />
                                Cairo, Egypt
                            </div>

                            <div className="flex items-center gap-3">
                                <Users size={17} />
                                1,284 attendees
                            </div>

                        </div>

                    </motion.div>

                    {/* Floating Ticket */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                            rotate: [3, 5, 3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -right-2 top-8 w-48 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                    >
                        <p className="text-xs text-gray-400">
                            YOUR TICKET
                        </p>

                        <p className="mt-2 text-lg font-bold text-white">
                            VIP PASS
                        </p>

                        <div className="mt-5 grid grid-cols-6 gap-1">
                            {Array.from({ length: 30 }).map((_, i) => (
                                <span
                                    key={i}
                                    className="h-1.5 rounded-full bg-white/50"
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Floating Attendance */}
                    <motion.div
                        animate={{
                            y: [0, 12, 0],
                        }}
                        transition={{
                            duration: 3.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-16 -left-4 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 backdrop-blur-xl"
                    >
                        <p className="text-xs text-gray-500">
                            LIVE ATTENDANCE
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

                            <span className="text-xl font-bold text-white">
                                1,284
                            </span>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}