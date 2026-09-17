import Link from "next/link";
import { notFound } from "next/navigation";
import TicketCard from "@/app/components/TicketCard";
import { getEventBySlug } from "@/lib/mockData";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventBySlug(id);

  if (!event) {
    notFound();
  }

  const ticketData = {
    ticketId: "NEXUS-2026-8421",
    eventId: event.slug,
    eventName: event.title,
    eventDate: event.date,
    eventTime: event.time,
    venue: event.venue,
    seatNumber: "A12",
    userName: "Ahmed Hassan",
    userEmail: "ahmed@example.com",
    price: event.price,
  };

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white md:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-400">Your ticket</p>
            <h1 className="mt-3 text-4xl font-bold">Booking confirmed</h1>
          </div>

          <Link
            href="/events"
            className="inline-flex w-fit items-center rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            View more events
          </Link>
        </div>

        <TicketCard ticketData={ticketData} />
      </div>
    </main>
  );
}
