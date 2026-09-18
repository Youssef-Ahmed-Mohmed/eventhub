import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { adminDb } from "@/lib/supabase/admin";
import { getCurrentUser, isCurrentUserAdmin } from "@/lib/supabase/admin-access";
export async function POST(request: Request) {
  const { ticketId } = await request.json();
  if (!ticketId) return NextResponse.json({ error: "Ticket is required" }, { status: 400 });
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Please sign in to view a ticket." }, { status: 401 });
  const { data: ticket } = await adminDb.from("tickets").select("id,event_id,user_id,seats(status)").eq("id", ticketId).single();
  if (!ticket) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
  if (ticket.user_id !== user.id && !(await isCurrentUserAdmin())) return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  const seat = ticket.seats as unknown as { status: string };
  if (seat.status !== "booked") return NextResponse.json({ error: "Complete payment before generating your QR ticket." }, { status: 409 });
  const secret = process.env.QR_SECRET_KEY;
  if (!secret) return NextResponse.json({ error: "QR configuration is missing" }, { status: 500 });
  return NextResponse.json({ token: jwt.sign({ ticketId: ticket.id, eventId: ticket.event_id, userId: ticket.user_id }, secret, { expiresIn: "30d" }) });
}
