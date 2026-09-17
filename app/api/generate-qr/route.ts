import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { adminDb } from "@/lib/firebaseAdmin";

const SECRET_KEY = process.env.QR_SECRET_KEY || "default_fallback_secret";

export async function POST(req: Request) {
    try {
        const { ticketId, eventId, userId } = await req.json();

        if (!ticketId || !eventId || !userId) {
            return NextResponse.json({ error: "بيانات غير مكتملة" }, { status: 400 });
        }

        // 1. التثبت من وجود التذكرة في Firestore
        const ticketRef = adminDb.doc(`events/${eventId}/tickets/${ticketId}`);
        const ticketDoc = await ticketRef.get();

        if (!ticketDoc.exists) {
            return NextResponse.json({ error: "التذكرة غير موجودة" }, { status: 404 });
        }

        // 2. توليد Secure Payload وتوقيعه رقمياً
        const payload = {
            ticketId,
            eventId,
            userId,
            iat: Math.floor(Date.now() / 1000),
        };

        const qrToken = jwt.sign(payload, SECRET_KEY);

        return NextResponse.json({ success: true, qrToken });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}