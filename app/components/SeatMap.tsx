"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface FirestoreSeat {
    id: string; // مثل "seat-1"
    number: number;
    status: "available" | "reserved" | "booked";
    reservedBy?: string;
}

export default function SeatMap({ eventId = "event1", userId }: { eventId?: string; userId?: string }) {
    const [seats, setSeats] = useState<FirestoreSeat[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // 1. الاستماع اللحظي لحالة المقاعد من Firestore
    useEffect(() => {
        if (!eventId) return;

        const seatsRef = collection(db, `events/${eventId}/seats`);
        const unsubscribe = onSnapshot(seatsRef, (snapshot) => {
            const fetchedSeats: FirestoreSeat[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<FirestoreSeat, "id">),
            }));

            // ترتيب المقاعد تصاعدياً حسب رقم المقعد
            fetchedSeats.sort((a, b) => a.number - b.number);
            setSeats(fetchedSeats);
        });

        return () => unsubscribe();
    }, [eventId]);

    // تحديد/إلغاء تحديد المقعد المتاح
    const toggleSeat = (seatId: string, status: string) => {
        if (status !== "available") return; // منع تحديد المقاعد المحجوزة

        setSelectedSeats((current) =>
            current.includes(seatId)
                ? current.filter((id) => id !== seatId)
                : [...current, seatId]
        );
    };

    const ticketPrice = 750;
    const total = selectedSeats.length * ticketPrice;

    // 2. إرسال الطلب لـ API الحجز
    const handleCheckout = async () => {
        if (selectedSeats.length === 0 || !userId) {
            alert("برجاء اختيار مقعد وتسجيل الدخول أولاً");
            return;
        }

        setLoading(true);
        try {
            // حجز أول مقعد محدد كمثال، أو تنفيذهم معاً
            for (const seatId of selectedSeats) {
                const res = await fetch("/api/reserve-seat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ eventId, seatId, userId }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
            }

            alert("تم حجز المقاعد بنجاح! جاري تحويلك للتأكيد...");
            setSelectedSeats([]);
        } catch (error: any) {
            alert(error.message || "حدث خطأ أثناء حجز المقاعد");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative overflow-hidden bg-[#050505] px-8 py-32">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mb-14 text-center"
                >
                    <p className="mb-4 text-sm uppercase tracking-[0.3em] text-purple-400">
                        Choose your seat
                    </p>

                    <h2 className="text-4xl font-bold text-white md:text-5xl">
                        Find your perfect seat
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-gray-400">
                        Select your seats and reserve your place at the event.
                    </p>
                </motion.div>

                {/* Main Card */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-10">

                    {/* Stage */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0.8 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mx-auto mb-14 max-w-2xl"
                    >
                        <div className="rounded-2xl border border-purple-400/20 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 py-4 text-center">
                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
                                Stage
                            </span>
                        </div>
                    </motion.div>

                    {/* Seats Grid */}
                    <div className="mx-auto grid max-w-2xl grid-cols-8 gap-3">
                        {seats.length === 0 ? (
                            <p className="col-span-8 text-center text-gray-500">جاري تحميل المقاعد من Firestore...</p>
                        ) : (
                            seats.map((seat) => {
                                const isSelected = selectedSeats.includes(seat.id);
                                const isBooked = seat.status === "booked" || seat.status === "reserved";

                                return (
                                    <motion.button
                                        key={seat.id}
                                        disabled={isBooked}
                                        onClick={() => toggleSeat(seat.id, seat.status)}
                                        whileHover={!isBooked ? { scale: 1.15 } : {}}
                                        whileTap={!isBooked ? { scale: 0.9 } : {}}
                                        className={`aspect-square rounded-lg text-xs font-medium transition-all ${isBooked
                                            ? "bg-red-500/20 text-red-400 border border-red-500/30 cursor-not-allowed"
                                            : isSelected
                                                ? "bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                                                : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"
                                            }`}
                                    >
                                        {seat.number || seat.id}
                                    </motion.button>
                                );
                            })
                        )}
                    </div>

                    {/* Legend */}
                    <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded bg-white/10" />
                            Available
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded bg-purple-500" />
                            Selected
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded bg-red-500/30 border border-red-500/50" />
                            Booked
                        </div>
                    </div>

                    {/* Summary */}
                    <motion.div
                        layout
                        className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-6"
                    >
                        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                            <div>
                                <p className="text-sm text-gray-500">SELECTED SEATS</p>
                                <p className="mt-2 text-lg font-semibold text-white">
                                    {selectedSeats.length > 0
                                        ? selectedSeats.join(", ")
                                        : "No seats selected"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">TOTAL</p>
                                <p className="mt-2 text-2xl font-bold text-white">
                                    {total.toLocaleString()} EGP
                                </p>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={selectedSeats.length === 0 || loading}
                                className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                {loading ? "Processing..." : "Continue"}
                            </button>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}