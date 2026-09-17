"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import EventCard from "./EventCard";
import { events } from "@/lib/mockData";

export default function EventsSection() {
    return (
        <section className="relative bg-[#050505] px-8 py-32" id="events">

            <div className="mx-auto max-w-7xl">

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

                    <Link
                        href="/events"
                        className="w-fit rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
                    >
                        View all events →
                    </Link>

                </motion.div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.slice(0, 3).map((event, index) => (
                        <motion.div
                            key={event.slug}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.15,
                            }}
                        >
                            <Link href={`/events/${event.slug}`} className="block">
                                <EventCard
                                    title={event.title}
                                    category={event.category}
                                    date={event.date}
                                    location={event.location}
                                    attendees={event.attendees}
                                    gradient={event.gradient}
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}