"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";

interface TicketProps {
    ticketData: {
        ticketId: string;
        eventId: string;
        eventName: string;
        eventDate: string;
        eventTime: string;
        venue: string;
        seatNumber: string;
        userName: string;
        userEmail: string;
        price: number;
    };
}

export default function TicketCard({ ticketData }: TicketProps) {
    const ticketRef = useRef<HTMLDivElement>(null);

    // دالة تحميل التذكرة كصورة PNG
    const handleDownload = async () => {
        if (ticketRef.current === null) return;

        try {
            const dataUrl = await toPng(ticketRef.current, { cacheBust: true });
            const link = document.createElement("a");
            link.download = `Ticket-${ticketData.seatNumber}-${ticketData.ticketId.slice(0, 6)}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error("فشل تحميل التذكرة:", err);
            alert("حدث خطأ أثناء تحميل التذكرة.");
        }
    };

    // حزمة البيانات المشفرة داخل الـ QR Code للتحقق منها عند البوابة
    const qrValue = JSON.stringify({
        ticketId: ticketData.ticketId,
        eventId: ticketData.eventId,
    });

    return (
        <div className="flex flex-col items-center justify-center gap-6 p-4">
            {/* جسم التذكرة المضيئة */}
            <motion.div
                ref={ticketRef}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-purple-500/30 bg-black/80 p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] md:flex-row"
            >
                {/* إضاءات خلفية ديكورية (Glow Effects) */}
                <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-purple-600/30 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-pink-600/30 blur-3xl pointer-events-none" />

                {/* الجزء الأيسر: تفاصيل الفعالية والمستخدِم */}
                <div className="flex-1 space-y-6 border-b border-white/10 pb-6 md:border-b-0 md:border-r md:border-dashed md:border-white/20 md:pb-0 md:pr-8">
                    {/* Header */}
                    <div>
                        <span className="inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-purple-400 border border-purple-500/20">
                            OFFICIAL PASS
                        </span>
                        <h3 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                            {ticketData.eventName}
                        </h3>
                    </div>

                    {/* تفاصيل الموعد والمكان */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500">Date & Time</p>
                            <p className="mt-1 font-medium text-gray-200">{ticketData.eventDate}</p>
                            <p className="text-xs text-gray-400">{ticketData.eventTime}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500">Location</p>
                            <p className="mt-1 font-medium text-gray-200">{ticketData.venue}</p>
                        </div>
                    </div>

                    {/* بيانات صاحب التذكرة والمقعد */}
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500">Passenger / User</p>
                            <p className="font-semibold text-white">{ticketData.userName}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs uppercase tracking-wider text-purple-400">Seat Number</p>
                            <p className="text-2xl font-black text-purple-400">{ticketData.seatNumber}</p>
                        </div>
                    </div>
                </div>

                {/* الجزء الأيمن: الـ QR Code للتثبت عند البوابة */}
                <div className="flex flex-col items-center justify-center pt-6 md:pl-8 md:pt-0">
                    <div className="rounded-2xl border border-purple-500/30 bg-white p-3 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                        <QRCodeSVG
                            value={qrValue}
                            size={130}
                            bgColor={"#FFFFFF"}
                            fgColor={"#000000"}
                            level={"H"}
                            includeMargin={false}
                        />
                    </div>
                    <p className="mt-3 text-[10px] uppercase tracking-widest text-gray-400">
                        Scan at entrance
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-purple-300/70">
                        #{ticketData.ticketId.slice(0, 8)}
                    </p>
                </div>
            </motion.div>

            {/* زرار تحميل التذكرة */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-600/20 px-8 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-purple-600/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]"
            >
                <svg
                    className="h-5 w-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                </svg>
                Download Ticket Pass
            </motion.button>
        </div>
    );
}