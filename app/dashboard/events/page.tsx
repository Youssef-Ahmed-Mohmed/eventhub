"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    CalendarDays,
    MapPin,
    MoreHorizontal,
    Plus,
    Search,
    Users,
    X,
} from "lucide-react";
import { useState } from "react";

const events = [
    {
        id: 1,
        title: "Tech Summit 2026",
        category: "Technology",
        date: "Oct 24, 2026",
        location: "Cairo, Egypt",
        attendees: 1284,
        status: "Live",
    },
    {
        id: 2,
        title: "Design Forward",
        category: "Design",
        date: "Nov 08, 2026",
        location: "Alexandria, Egypt",
        attendees: 842,
        status: "Upcoming",
    },
    {
        id: 3,
        title: "Future AI",
        category: "Artificial Intelligence",
        date: "Dec 15, 2026",
        location: "Dubai, UAE",
        attendees: 2430,
        status: "Upcoming",
    },
    {
        id: 4,
        title: "Startup Connect",
        category: "Business",
        date: "Jan 12, 2027",
        location: "Cairo, Egypt",
        attendees: 620,
        status: "Draft",
    },
];

export default function EventsPage() {
    const [search, setSearch] = useState("");
    const [showCreateForm, setShowCreateForm] = useState(false);

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <section className="mx-auto max-w-7xl px-6 py-10 md:px-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col justify-between gap-6 md:flex-row md:items-center"
                >
                    <div>
                        <p className="text-sm text-purple-400">
                            Organizer
                        </p>

                        <h1 className="mt-2 text-4xl font-bold">
                            Events
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Create and manage all your events.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
                    >
                        <Plus size={18} />
                        Create Event
                    </button>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-10 flex items-center rounded-2xl border border-white/10 bg-white/4 px-4 backdrop-blur-xl"
                >
                    <Search size={20} className="text-gray-500" />

                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-gray-600"
                    />
                </motion.div>

                {/* Events */}
                <div className="mt-8 grid gap-5 md:grid-cols-2">

                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            whileHover={{ y: -5 }}
                            className="rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl"
                        >

                            <div className="flex items-start justify-between">

                                <div>
                                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-300">
                                        {event.category}
                                    </span>

                                    <h2 className="mt-4 text-2xl font-bold">
                                        {event.title}
                                    </h2>
                                </div>

                                <button className="rounded-full p-2 text-gray-500 transition hover:bg-white/10 hover:text-white">
                                    <MoreHorizontal size={20} />
                                </button>

                            </div>

                            <div className="mt-6 space-y-3 text-sm text-gray-400">

                                <div className="flex items-center gap-3">
                                    <CalendarDays size={17} />
                                    {event.date}
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin size={17} />
                                    {event.location}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Users size={17} />
                                    {event.attendees.toLocaleString("en-US")} attendees
                                </div>

                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">

                                <span
                                    className={`rounded-full px-3 py-1 text-xs ${event.status === "Live"
                                        ? "bg-green-500/10 text-green-400"
                                        : event.status === "Draft"
                                            ? "bg-yellow-500/10 text-yellow-400"
                                            : "bg-blue-500/10 text-blue-400"
                                        }`}
                                >
                                    {event.status}
                                </span>

                                <button className="text-sm text-gray-400 transition hover:text-white">
                                    Manage event →
                                </button>

                            </div>

                        </motion.div>
                    ))}

                </div>

                {/* No Results */}
                {filteredEvents.length === 0 && (
                    <div className="py-20 text-center text-gray-500">
                        No events found.
                    </div>
                )}

                {/* Create Event Modal */}
                <AnimatePresence>
                    {showCreateForm && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
                            onClick={() => setShowCreateForm(false)}
                        >

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                transition={{ duration: 0.25 }}
                                onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
                                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0b0b] p-7 shadow-2xl"
                            >

                                {/* Modal Header */}
                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm text-purple-400">
                                            New Event
                                        </p>

                                        <h2 className="mt-1 text-3xl font-bold">
                                            Create an event
                                        </h2>
                                    </div>

                                    <button
                                        onClick={() => setShowCreateForm(false)}
                                        className="rounded-full p-2 text-gray-500 transition hover:bg-white/10 hover:text-white"
                                    >
                                        <X size={20} />
                                    </button>

                                </div>

                                {/* Form */}
                                <form
                                    className="mt-8 space-y-5"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setShowCreateForm(false);
                                    }}
                                >

                                    {/* Event Name */}
                                    <div>
                                        <label className="mb-2 block text-sm text-gray-400">
                                            Event Name
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="e.g. Tech Summit 2026"
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-purple-400/50"
                                        />
                                    </div>

                                    {/* Category + Date */}
                                    <div className="grid gap-5 md:grid-cols-2">

                                        <div>
                                            <label className="mb-2 block text-sm text-gray-400">
                                                Category
                                            </label>

                                            <select
                                                required
                                                className="w-full rounded-xl border border-white/10 bg-[#111] px-4 py-3 text-white outline-none"
                                            >
                                                <option value="">Select category</option>
                                                <option>Technology</option>
                                                <option>Design</option>
                                                <option>Business</option>
                                                <option>Education</option>
                                                <option>Entertainment</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm text-gray-400">
                                                Event Date
                                            </label>

                                            <input
                                                type="date"
                                                required
                                                className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none"
                                            />
                                        </div>

                                    </div>

                                    {/* Location */}
                                    <div>
                                        <label className="mb-2 block text-sm text-gray-400">
                                            Location
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Cairo, Egypt"
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-purple-400/50"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="mb-2 block text-sm text-gray-400">
                                            Description
                                        </label>

                                        <textarea
                                            rows={4}
                                            placeholder="Tell attendees about your event..."
                                            className="w-full resize-none rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-purple-400/50"
                                        />
                                    </div>

                                    {/* Price + Capacity */}
                                    <div className="grid gap-5 md:grid-cols-2">

                                        <div>
                                            <label className="mb-2 block text-sm text-gray-400">
                                                Ticket Price
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="750"
                                                required
                                                className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-purple-400/50"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm text-gray-400">
                                                Maximum Attendees
                                            </label>

                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="2000"
                                                required
                                                className="w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-white outline-none placeholder:text-gray-600 focus:border-purple-400/50"
                                            />
                                        </div>

                                    </div>

                                    {/* Buttons */}
                                    <div className="flex justify-end gap-3 border-t border-white/10 pt-6">

                                        <button
                                            type="button"
                                            onClick={() => setShowCreateForm(false)}
                                            className="rounded-full border border-white/10 px-5 py-3 text-sm text-gray-400 transition hover:bg-white/10 hover:text-white"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105"
                                        >
                                            Create Event
                                        </button>

                                    </div>

                                </form>

                            </motion.div>

                        </motion.div>
                    )}
                </AnimatePresence>

            </section>
        </main>
    );
}