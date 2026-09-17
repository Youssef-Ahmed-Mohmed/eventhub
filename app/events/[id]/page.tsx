import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, CheckCircle2, Clock3, MapPin, Ticket, Users } from "lucide-react";
import { getEventBySlug } from "@/lib/mockData";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventBySlug(id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/events" className="hover:text-white">Events</Link>
          <span>/</span>
          <span className="text-gray-200">{event.title}</span>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04]">
          <div className={`relative h-80 md:h-96 ${event.gradient}`}>
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs tracking-[0.2em] text-white backdrop-blur-md">
              {event.category}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">Featured event</p>
                  <h1 className="mt-3 text-4xl font-bold md:text-6xl">{event.title}</h1>
                </div>
                <div className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-sm text-white backdrop-blur-md">
                  {event.status}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-10 p-6 md:grid-cols-[1.5fr_0.9fr] md:p-10">
            <div>
              <p className="text-lg leading-8 text-gray-300">{event.description}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 flex items-center gap-3 text-purple-300">
                    <Calendar size={18} />
                    <span className="text-sm uppercase tracking-[0.2em]">Date</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{event.date}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 flex items-center gap-3 text-purple-300">
                    <Clock3 size={18} />
                    <span className="text-sm uppercase tracking-[0.2em]">Time</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{event.time}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 flex items-center gap-3 text-purple-300">
                    <MapPin size={18} />
                    <span className="text-sm uppercase tracking-[0.2em]">Location</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{event.location}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="mb-3 flex items-center gap-3 text-purple-300">
                    <Users size={18} />
                    <span className="text-sm uppercase tracking-[0.2em]">Attendees</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{event.attendees}</p>
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/10 bg-black/20 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Ticket</p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-black text-white">${event.price}</p>
                  <p className="mt-1 text-sm text-gray-400">starting price</p>
                </div>
                <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                  {event.capacity.toLocaleString("en-US")} seats
                </div>
              </div>

              <div className="mt-8 space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-purple-400" />
                  VIP networking access
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-purple-400" />
                  Digital event ticket
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-purple-400" />
                  Live session check-in
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href={`/booking/${event.slug}`}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]"
                >
                  Reserve your seat
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/events"
                  className="flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                >
                  Browse other events
                </Link>
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Ticket size={18} className="text-purple-400" />
                  Best for founders, creators, and product teams.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
