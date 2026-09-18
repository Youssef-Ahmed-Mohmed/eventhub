import { NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase/admin";
import { getCurrentUser, isCurrentUserAdmin } from "@/lib/supabase/admin-access";

export async function GET() {
  const { data, error } = await adminDb.from("events").select("*").order("event_date", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ events: data });
}
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Please sign in to create an event." }, { status: 401 });
  const admin = await isCurrentUserAdmin();
  const body = await request.json();
  const { title, event_date, location, description, category, status, ticket_price, capacity } = body;
  if (!title || !event_date || !location || !capacity) return NextResponse.json({ error: "Title, date, location and capacity are required" }, { status: 400 });
  const payload = { title, event_date, location, description: description || "", category: category || "General", status: admin ? (status || "Upcoming") : "Pending Review", created_by: user.id, ticket_price: Number(ticket_price) || 0, capacity: Number(capacity) };
  let { data: event, error } = await adminDb.from("events").insert(payload).select().single();
  // Backward-compatible fallback while the SQL migration is being applied.
  if (error && !admin) {
    const legacyPayload = { title, event_date, location, description: description || "", category: category || "General", status: "Draft", ticket_price: Number(ticket_price) || 0, capacity: Number(capacity) };
    ({ data: event, error } = await adminDb.from("events").insert(legacyPayload).select().single());
  }
  if (error || !event) return NextResponse.json({ error: error?.message || "Could not create event" }, { status: 500 });
  const seats = Array.from({ length: event.capacity }, (_, index) => ({ event_id: event.id, seat_number: index + 1 }));
  const { error: seatsError } = await adminDb.from("seats").insert(seats);
  if (seatsError) return NextResponse.json({ error: seatsError.message }, { status: 500 });
  return NextResponse.json({ event }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await isCurrentUserAdmin())) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  const { id, decision } = await request.json();
  if (!id || !["approve", "reject"].includes(decision)) return NextResponse.json({ error: "Invalid review request" }, { status: 400 });
  const status = decision === "approve" ? "Upcoming" : "Rejected";
  let { data, error } = await adminDb.from("events").update({ status }).eq("id", id).select().single();
  // Existing installations do not yet have Rejected in the original status constraint.
  if (error && decision === "reject") ({ data, error } = await adminDb.from("events").update({ status: "Completed" }).eq("id", id).select().single());
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ event: data });
}
