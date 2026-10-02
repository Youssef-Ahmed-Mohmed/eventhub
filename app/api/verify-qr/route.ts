import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { adminDb } from "@/lib/supabase/admin";
import {
  canManageEvents,
  getCurrentUser,
  isCurrentUserAdmin,
} from "@/lib/supabase/admin-access";
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json(
      { error: "Sign in to check in tickets." },
      { status: 401 },
    );
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
  const token =
    body && typeof body === "object" && "token" in body ? body.token : null;
  if (typeof token !== "string" || token.length > 4096)
    return NextResponse.json(
      { error: "A valid QR token is required." },
      { status: 400 },
    );
  try {
    const secret = process.env.QR_SECRET_KEY;
    if (!secret) throw new Error("QR configuration is missing");
    const payload = jwt.verify(token, secret) as jwt.JwtPayload & {
      ticketId?: unknown;
      eventId?: unknown;
    };
    if (
      !payload ||
      typeof payload === "string" ||
      typeof payload.ticketId !== "string" ||
      typeof payload.eventId !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid ticket QR." },
        { status: 400 },
      );
    }
    const { ticketId, eventId } = payload;
    if (!(await isCurrentUserAdmin())) {
      if (!(await canManageEvents(user.id)))
        return NextResponse.json(
          { error: "Organizer access required." },
          { status: 403 },
        );
      const { data: event } = await adminDb
        .from("events")
        .select("created_by")
        .eq("id", eventId)
        .maybeSingle();
      if (!event || event.created_by !== user.id)
        return NextResponse.json(
          { error: "You can only check in your own events." },
          { status: 403 },
        );
    }
    const { data, error } = await adminDb.rpc("check_in_ticket", {
      p_event_id: eventId,
      p_ticket_id: ticketId,
    });
    if (error) throw error;
    return NextResponse.json({ success: true, ticket: data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid ticket" },
      { status: 400 },
    );
  }
}
