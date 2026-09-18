import { NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/supabase/admin-access";
export async function POST(request: Request) {
  const user = await getCurrentUser();
  const { ticketId, paymentMethod } = await request.json();
  if (!user) return NextResponse.json({ error: "Please sign in to complete payment." }, { status: 401 });
  if (!ticketId || !paymentMethod) return NextResponse.json({ error: "Payment information is required." }, { status: 400 });
  const { data: ticket, error } = await adminDb.from("tickets").select("id,seat_id,status,user_id").eq("id", ticketId).eq("user_id", user.id).single();
  if (error || !ticket) return NextResponse.json({ error: "Ticket not found." }, { status: 404 });
  if (ticket.status !== "reserved") return NextResponse.json({ error: "This ticket cannot be paid for." }, { status: 409 });
  const { error: seatError } = await adminDb.from("seats").update({ status: "booked" }).eq("id", ticket.seat_id).eq("status", "reserved");
  if (seatError) return NextResponse.json({ error: seatError.message }, { status: 500 });
  return NextResponse.json({ success: true, ticketId });
}
