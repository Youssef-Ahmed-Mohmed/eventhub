import { NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase/admin";
import {
  canManageEvents,
  getCurrentUser,
  getCurrentUserRole,
  isCurrentUserAdmin,
} from "@/lib/supabase/admin-access";
import {
  eventDeleteSchema,
  eventReviewSchema,
  eventSchema,
} from "@/lib/validation";

export async function GET() {
  const user = await getCurrentUser();
  const role = user ? await getCurrentUserRole(user.id) : "attendee";
  let query = adminDb
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });
  if (role === "organizer")
    query = query.or(
      `status.in.(Upcoming,Live,Completed),created_by.eq.${user!.id}`,
    );
  else if (role !== "admin")
    query = query.in("status", ["Upcoming", "Live", "Completed"]);
  const { data, error } = await query;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  const admin = user ? await isCurrentUserAdmin() : false;
  const manager = user ? await canManageEvents(user.id) : false;
  const events = (data ?? []).map((event) => ({
    ...event,
    canDelete: Boolean(
      user && (admin || (manager && event.created_by === user.id)),
    ),
  }));
  return NextResponse.json({
    events,
    canReview: admin,
    canManageEvents: manager,
  });
}
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json(
      { error: "Please sign in to create an event." },
      { status: 401 },
    );
  const admin = await isCurrentUserAdmin();
  const manager = await canManageEvents(user.id);
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const validation = eventSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      {
        error:
          validation.error.issues[0]?.message ?? "Check the event details.",
      },
      { status: 400 },
    );
  const payload = {
    ...validation.data,
    status: manager ? "Upcoming" : "Pending Review",
    created_by: user.id,
  };
  const { data: event, error } = await adminDb
    .from("events")
    .insert(payload)
    .select()
    .single();
  if (error || !event)
    return NextResponse.json(
      { error: error?.message || "Could not create event" },
      { status: 500 },
    );
  const seats = Array.from({ length: event.capacity }, (_, index) => ({
    event_id: event.id,
    seat_number: index + 1,
  }));
  const { error: seatsError } = await adminDb.from("seats").insert(seats);
  if (seatsError)
    return NextResponse.json({ error: seatsError.message }, { status: 500 });
  return NextResponse.json({ event }, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await isCurrentUserAdmin()))
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 },
    );
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const validation = eventReviewSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: "Invalid review request." },
      { status: 400 },
    );
  const { id, decision } = validation.data;
  const status = decision === "approve" ? "Upcoming" : "Rejected";
  const { data, error } = await adminDb
    .from("events")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ event: data });
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json(
      { error: "Please sign in to delete an event." },
      { status: 401 },
    );

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const validation = eventDeleteSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: "A valid event id is required." },
      { status: 400 },
    );
  const { id } = validation.data;

  const { data: event, error: lookupError } = await adminDb
    .from("events")
    .select("id,created_by")
    .eq("id", id)
    .maybeSingle();
  if (lookupError)
    return NextResponse.json({ error: lookupError.message }, { status: 500 });
  if (!event)
    return NextResponse.json({ error: "Event not found" }, { status: 404 });

  const admin = await isCurrentUserAdmin();
  if (
    !(await canManageEvents(user.id)) ||
    (!admin && event.created_by !== user.id)
  ) {
    return NextResponse.json(
      { error: "Only the event organizer or an admin can delete this event." },
      { status: 403 },
    );
  }

  const { error } = await adminDb.from("events").delete().eq("id", event.id);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
