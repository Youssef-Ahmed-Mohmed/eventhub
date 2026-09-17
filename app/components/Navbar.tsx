"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="fixed top-0 left-0 z-50 w-full px-8 py-6"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl">

                {/* Logo */}
                <div className="text-xl font-bold tracking-widest text-white">
                    NEXUS<span className="text-purple-400">.</span>
                </div>

                {/* Links */}
                <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
                    <a href="#" className="transition hover:text-white">
                        Events
                    </a>

                    <a href="#" className="transition hover:text-white">
                        Speakers
                    </a>

                    <a href="#" className="transition hover:text-white">
                        About
                    </a>
                </div>

                {/* Button */}
                <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105">
                    Create Event
                    <ArrowUpRight size={16} />
                </button>

            </div>
        </motion.nav>
    );
}