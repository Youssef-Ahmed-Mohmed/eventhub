import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { events } from "@/lib/mockData";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#050505] px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-purple-400">Discover</p>
            <h1 className="text-4xl font-bold md:text-5xl">Browse all events</h1>
          </div>

          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            Back home
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Link key={event.slug} href={`/events/${event.slug}`} className="group block">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition hover:-translate-y-1 hover:border-purple-500/30">
                <div className={`relative h-52 ${event.gradient}`}>
                  <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    {event.category}
                  </div>
                  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                    <ArrowRight size={17} />
                  </div>
                  <div className="absolute bottom-5 left-5">
                    <p className="text-xs tracking-[0.2em] text-white/60">EVENT DATE</p>
                    <p className="mt-2 text-lg font-semibold text-white">{event.date}</p>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white">{event.title}</h2>
                  <div className="mt-5 space-y-3 text-sm text-gray-400">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={16} />
                      {event.location}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <span className="text-sm text-gray-500">{event.attendees} attendees</span>
                    <span className="text-sm font-medium text-purple-300 transition group-hover:text-white">
                      View event →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
