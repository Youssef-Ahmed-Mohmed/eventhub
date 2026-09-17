"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Activity,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    DollarSign,
    LayoutDashboard,
    LogOut,
    Mic2,
    Settings,
    Ticket,
    Users,
    UsersRound,
    Handshake, // أضفنا أيقونة جديدة للـ Sponsors للتنويع
} from "lucide-react";

const stats = [
    {
        title: "Total Events",
        value: "24",
        change: "+12%",
        icon: CalendarDays,
    },
    {
        title: "Tickets Sold",
        value: "8,492",
        change: "+18%",
        icon: Ticket,
    },
    {
        title: "Attendees",
        value: "6,284",
        change: "+24%",
        icon: Users,
    },
    {
        title: "Revenue",
        value: "$84.2K",
        change: "+16%",
        icon: DollarSign,
    },
];

const events = [
    {
        name: "Tech Summit 2026",
        date: "Oct 24, 2026",
        attendees: "1,284",
        status: "Live",
    },
    {
        name: "Design Forward",
        date: "Nov 08, 2026",
        attendees: "842",
        status: "Upcoming",
    },
    {
        name: "Future AI",
        date: "Dec 15, 2026",
        attendees: "2,430",
        status: "Upcoming",
    },
];

export default function Dashboard() {
    return (
        <main className="min-h-screen bg-[#050505] text-white">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#080808] p-6 lg:block">

                <div className="mb-12 text-2xl font-bold tracking-widest">
                    NEXUS<span className="text-purple-400">.</span>
                </div>

                <nav className="space-y-2">

                    <SidebarItem
                        icon={LayoutDashboard}
                        label="Overview"
                        active
                    />

                    <SidebarItem
                        icon={CalendarDays}
                        label="Events"
                    />

                    <SidebarItem
                        icon={Ticket}
                        label="Tickets"
                    />

                    <SidebarItem
                        icon={Users}
                        label="Attendees"
                    />

                    <SidebarItem
                        icon={Mic2}
                        label="Speakers"
                    />

                    <SidebarItem
                        icon={UsersRound}
                        label="Sessions"
                    />

                    <SidebarItem
                        icon={Handshake}
                        label="Sponsors"
                    />

                    <SidebarItem
                        icon={BarChart3}
                        label="Analytics"
                    />

                </nav>

                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <SidebarItem
                        icon={Settings}
                        label="Settings"
                    />

                    <SidebarItem
                        icon={LogOut}
                        label="Logout"
                    />
                </div>
            </aside>

            {/* Main */}
            <section className="lg:ml-64">

                <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col justify-between gap-6 md:flex-row md:items-center"
                    >
                        <div>
                            <p className="text-sm text-gray-500">
                                Organizer Dashboard
                            </p>

                            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                                Good evening, Organizer 👋
                            </h1>

                            <p className="mt-2 text-gray-400">
                                Here's what's happening with your events.
                            </p>
                        </div>

                        <button className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-105">
                            + Create Event
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {stats.map((stat, index) => {
                            const Icon = stat.icon;

                            return (
                                <motion.div
                                    key={stat.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                    whileHover={{ y: -5 }}
                                    className="rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl"
                                >
                                    <div className="flex items-center justify-between">

                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                                            <Icon size={21} />
                                        </div>

                                        <span className="text-xs font-medium text-green-400">
                                            {stat.change}
                                        </span>

                                    </div>

                                    <p className="mt-6 text-sm text-gray-500">
                                        {stat.title}
                                    </p>

                                    <p className="mt-1 text-3xl font-bold">
                                        {stat.value}
                                    </p>
                                </motion.div>
                            );
                        })}

                    </div>

                    {/* Analytics */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-6 rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl"
                    >

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Attendance Overview
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Live attendance across your events
                                </p>
                            </div>

                            <Activity className="text-purple-400" size={22} />
                        </div>

                        {/* Fake animated chart */}
                        <div className="mt-10 flex h-56 items-end gap-3">

                            {[35, 48, 42, 65, 58, 72, 68, 84, 76, 92, 86, 100].map(
                                (height, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${height}%` }}
                                        transition={{
                                            duration: 0.8,
                                            delay: index * 0.05,
                                        }}
                                        className="flex-1 rounded-t-lg bg-linear-to-t from-purple-600/20 to-purple-400/80"
                                    />
                                )
                            )}

                        </div>

                        <div className="mt-4 flex justify-between text-xs text-gray-600">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                            <span>Sep</span>
                            <span>Oct</span>
                            <span>Nov</span>
                            <span>Dec</span>
                        </div>

                    </motion.div>

                    {/* Events */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-6 rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl"
                    >

                        <div className="mb-6 flex items-center justify-between">

                            <div>
                                <h2 className="text-xl font-bold">
                                    Upcoming Events
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Manage your latest events
                                </p>
                            </div>

                            <button className="flex items-center gap-1 text-sm text-gray-400 transition hover:text-white">
                                View all
                                <ChevronRight size={16} />
                            </button>

                        </div>

                        <div className="space-y-3">

                            {events.map((event) => (
                                <motion.div
                                    key={event.name}
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-5 md:flex-row md:items-center md:justify-between"
                                >

                                    <div>
                                        <h3 className="font-semibold">
                                            {event.name}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {event.date}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-6">

                                        <div>
                                            <p className="text-xs text-gray-600">
                                                ATTENDEES
                                            </p>

                                            <p className="mt-1 font-semibold">
                                                {event.attendees}
                                            </p>
                                        </div>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs ${event.status === "Live"
                                                ? "bg-green-500/10 text-green-400"
                                                : "bg-purple-500/10 text-purple-400"
                                                }`}
                                        >
                                            {event.status}
                                        </span>

                                        <CheckCircle2
                                            size={18}
                                            className="text-gray-600"
                                        />

                                    </div>

                                </motion.div>
                            ))}

                        </div>

                    </motion.div>

                </div>
            </section>
        </main>
    );
}

function SidebarItem({
    icon: Icon,
    label,
    active = false,
}: {
    icon: React.ElementType;
    label: string;
    active?: boolean;
}) {
    return (
        <button
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${active
                ? "bg-white/10 text-white"
                : "text-gray-500 hover:bg-white/5 hover:text-white"
                }`}
        >
            <Icon size={18} />
            {label}
        </button>
    );
}