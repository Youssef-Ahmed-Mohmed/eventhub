"use client";

import React, { useState, useEffect } from "react";
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
    Handshake,
} from "lucide-react";

// استيراد أدوات الفايربيس
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase"; // تأكد من ضبط المسار حسب مشروعك

interface EventType {
    id: string;
    title: string;
    date: string;
    location?: string;
    status?: string;
}

const stats = [
    { title: "Total Events", value: "24", change: "+12%", icon: CalendarDays },
    { title: "Tickets Sold", value: "8,492", change: "+18%", icon: Ticket },
    { title: "Attendees", value: "6,284", change: "+24%", icon: Users },
    { title: "Revenue", value: "$84.2K", change: "+16%", icon: DollarSign },
];

export default function Dashboard() {
    // حالة تخزين البيانات القادمة من Firebase
    const [eventsList, setEventsList] = useState<EventType[]>([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    // 3. دالة جلب البيانات من Firebase Firestore
    const loadEventsFromFirebase = async () => {
        try {
            setLoadingEvents(true);
            const eventsRef = collection(db, "events");
            const q = query(eventsRef, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const fetchedEvents: EventType[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                fetchedEvents.push({
                    id: doc.id,
                    title: data.title,
                    date: data.date,
                    location: data.location,
                    status: data.status || "Upcoming",
                });
            });

            setEventsList(fetchedEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setLoadingEvents(false);
        }
    };

    // جلب البيانات فور تحميل الصفحة لأول مرة
    useEffect(() => {
        loadEventsFromFirebase();
    }, []);

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#080808] p-6 lg:block">
                <div className="mb-12 text-2xl font-bold tracking-widest">
                    NEXUS<span className="text-purple-400">.</span>
                </div>
                <nav className="space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Overview" active />
                    <SidebarItem icon={CalendarDays} label="Events" />
                    <SidebarItem icon={Ticket} label="Tickets" />
                    <SidebarItem icon={Users} label="Attendees" />
                    <SidebarItem icon={Mic2} label="Speakers" />
                    <SidebarItem icon={UsersRound} label="Sessions" />
                    <SidebarItem icon={Handshake} label="Sponsors" />
                    <SidebarItem icon={BarChart3} label="Analytics" />
                </nav>
                <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <SidebarItem icon={Settings} label="Settings" />
                    <SidebarItem icon={LogOut} label="Logout" />
                </div>
            </aside>

            {/* Main Section */}
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
                            <p className="text-sm text-gray-500">Organizer Dashboard</p>
                            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                                Good evening, Organizer 👋
                            </h1>
                            <p className="mt-2 text-gray-400">
                                Here's what's happening with your events.
                            </p>
                        </div>

                    </motion.div>

                    {/* Stats Cards */}
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={stat.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                                    <p className="mt-6 text-sm text-gray-500">{stat.title}</p>
                                    <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Upcoming Events Section القادمة من Firebase */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-6 rounded-3xl border border-white/10 bg-white/4 p-6 backdrop-blur-xl"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Upcoming Events</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Manage your live events from Firebase
                                </p>
                            </div>
                            <button className="flex items-center gap-1 text-sm text-gray-400 transition hover:text-white">
                                View all <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* عرض حالة التحميل أو القائمة */}
                        {loadingEvents ? (
                            <p className="text-sm text-gray-500 py-4">Loading events from Firebase...</p>
                        ) : eventsList.length === 0 ? (
                            <p className="text-sm text-gray-500 py-4">No events found. Create one!</p>
                        ) : (
                            <div className="space-y-3">
                                {eventsList.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-5 md:flex-row md:items-center md:justify-between"
                                    >
                                        <div>
                                            <h3 className="font-semibold">{event.title}</h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {event.date} {event.location && `• ${event.location}`}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs ${event.status === "Live"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : "bg-purple-500/10 text-purple-400"
                                                    }`}
                                            >
                                                {event.status}
                                            </span>
                                            <CheckCircle2 size={18} className="text-gray-600" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
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