"use client";

import React, { useState } from "react";

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEventCreated: () => void; // دالة لإعادة جلب البيانات بعد الإضافة
}

export default function CreateEventModal({
    isOpen,
    onClose,
    onEventCreated,
}: CreateEventModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        location: "",
        description: "",
    });

    // إذا كانت النافذة مغلقة لا تعرض شيئاً
    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                // إعادة إرسال القيمة وتفريغ النموذج
                setFormData({ title: "", date: "", location: "", description: "" });
                onEventCreated(); // تحديث القائمة في Dashboard
                onClose(); // إغلاق المودال
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error("Error creating event:", err);
            alert("حدث خطأ أثناء الاتصال بالسيرفر.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0c0c0c] p-6 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Create New Event</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Event Title *</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:outline-none focus:border-purple-500"
                            placeholder="e.g. AI & Robotics Session"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Date & Time *</label>
                        <input
                            type="datetime-local"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:outline-none focus:border-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Location</label>
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:outline-none focus:border-purple-500"
                            placeholder="e.g. Hall E414 / Online"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Description</label>
                        <textarea
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm focus:outline-none focus:border-purple-500"
                            placeholder="Brief details about the event..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border border-white/10 text-sm hover:bg-white/5"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-xl bg-purple-600 text-sm font-semibold hover:bg-purple-700 disabled:opacity-50 transition"
                        >
                            {loading ? "Saving..." : "Create Event"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}