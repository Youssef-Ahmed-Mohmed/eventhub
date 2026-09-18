import { NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/supabase/admin-access";
export async function POST(request: Request) {
  const user = await getCurrentUser();
  const { eventId, seatId } = await request.json();
  if (!user) return NextResponse.json({ error: "Please sign in before reserving a seat." }, { status: 401 });
  if (!eventId || !seatId) return NextResponse.json({ error: "Missing booking information" }, { status: 400 });
  const { data, error } = await adminDb.rpc("reserve_seat", { p_event_id: eventId, p_seat_id: seatId, p_user_id: user.id });
  if (error) return NextResponse.json({ error: error.message }, { status: 409 });
  return NextResponse.json({ ticketId: data.ticket_id });
}
