"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import SeatMap from "@/app/components/SeatMap";
import { publicDb } from "@/lib/supabase/public";
import { supabase } from "@/lib/subabase/client";
type Event = { id: string; title: string; event_date: string; location: string; ticket_price: number };
export default function BookingPage() { const { id } = useParams<{ id: string }>(); const router = useRouter(); const [event, setEvent] = useState<Event | null>(null), [ready, setReady] = useState(false); useEffect(() => { const load = async () => { const { data: { user } } = await supabase.auth.getUser(); if (!user) return router.replace(`/auth?returnTo=/booking/${id}`); const { data } = await publicDb.from("events").select("id,title,event_date,location,ticket_price").eq("id", id).single(); setEvent(data); setReady(true); }; void load(); }, [id, router]); if (!ready || !event) return <main className="min-h-screen bg-[#050505] p-20 text-center text-white">Loading secure booking…</main>; return <main className="min-h-screen bg-[#050505] px-6 py-20 text-white"><div className="mx-auto max-w-5xl"><Link href={`/events/${id}`} className="text-sm text-cyan-300">← Event details</Link><h1 className="mt-5 text-4xl font-bold">Reserve your seat</h1><p className="mt-3 text-gray-400">{event.title} · {new Date(event.event_date).toLocaleString()} · {event.location}</p><p className="mt-2 text-sm text-cyan-200">Step 1 of 2 — choose a seat, then complete payment.</p><div className="mt-10"><SeatMap eventId={event.id} price={Number(event.ticket_price)} onBooked={(ticketId) => router.push(`/checkout/${ticketId}`)} /></div></div></main>; }
