import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { adminDb } from "@/lib/supabase/admin";
import { isCurrentUserAdmin } from "@/lib/supabase/admin-access";
export async function POST(request: Request) {
  if (!(await isCurrentUserAdmin())) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  const { token } = await request.json();
  try {
    const secret = process.env.QR_SECRET_KEY;
    if (!secret) throw new Error("QR configuration is missing");
    const { ticketId, eventId } = jwt.verify(token, secret) as { ticketId: string; eventId: string };
    const { data, error } = await adminDb.rpc("check_in_ticket", { p_event_id: eventId, p_ticket_id: ticketId });
    if (error) throw error;
    return NextResponse.json({ success: true, ticket: data });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid ticket" }, { status: 400 }); }
}
