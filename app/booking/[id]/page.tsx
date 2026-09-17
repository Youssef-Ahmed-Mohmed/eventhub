"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Ticket } from "lucide-react";
import SeatMap from "@/app/components/SeatMap";
import { getEventBySlug } from "@/lib/mockData";

export default function BookingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const event = getEventBySlug(params.id);

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Event not found</h1>
          <Link href="/events" className="mt-6 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5">
            Browse events
          </Link>
        </div>
      </main>
    );
  }

  const handleBooked = () => {
    router.push(`/tickets/${event.slug}`);
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Booking</p>
            <h1 className="mt-3 text-4xl font-bold">{event.title}</h1>
          </div>

          <Link href={`/events/${event.slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
            <ArrowLeft size={16} />
            Event details
          </Link>
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar size={18} className="text-purple-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin size={18} className="text-purple-400" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Ticket size={18} className="text-purple-400" />
              <span>From ${event.price}</span>
            </div>
          </div>
        </div>

        <SeatMap eventId={event.slug} userId="demo-attendee" onBooked={handleBooked} />
      </div>
    </main>
  );
}
