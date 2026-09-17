"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";

type EventCardProps = {
    title: string;
    category: string;
    date: string;
    location: string;
    attendees: string;
    gradient: string;
};

export default function EventCard({
    title,
    category,
    date,
    location,
    attendees,
    gradient,
}: EventCardProps) {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.25 }}
            className="group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
        >
            {/* Event Image */}
            <div className="relative h-64 overflow-hidden">
                <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 ${gradient}`}
                />

                {/* Category */}
                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    {category}
                </div>

                {/* Arrow */}
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"
                >
                    <ArrowUpRight size={18} />
                </motion.div>

                {/* Date */}
                <div className="absolute bottom-5 left-5">
                    <p className="text-sm text-white/60">EVENT DATE</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                        {date}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">

                <h3 className="text-2xl font-bold text-white">
                    {title}
                </h3>

                <div className="mt-5 space-y-3 text-sm text-gray-400">

                    <div className="flex items-center gap-3">
                        <Calendar size={16} />
                        {date}
                    </div>

                    <div className="flex items-center gap-3">
                        <MapPin size={16} />
                        {location}
                    </div>

                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-sm text-gray-500">
                        {attendees} attendees
                    </span>

                    <span className="text-sm font-medium text-white transition group-hover:text-purple-400">
                        View event →
                    </span>
                </div>

            </div>
        </motion.div>
    );
}