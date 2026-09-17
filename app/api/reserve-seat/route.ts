import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
    try {
        const { eventId, seatId, userId } = await req.json();

        if (!eventId || !seatId || !userId) {
            return NextResponse.json({ error: "بيانات الحجز غير مكتملة" }, { status: 400 });
        }

        const seatRef = adminDb.doc(`events/${eventId}/seats/${seatId}`);
        await adminDb.runTransaction(async (transaction) => {
            const seat = await transaction.get(seatRef);

            if (!seat.exists) {
                throw new Error("المقعد غير موجود");
            }

            if (seat.data()?.status !== "available") {
                throw new Error("المقعد محجوز بالفعل");
            }

            transaction.update(seatRef, {
                status: "reserved",
                reservedBy: userId,
                reservedAt: new Date().toISOString(),
            });
        });

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "تعذر حجز المقعد";
        return NextResponse.json({ error: message }, { status: 409 });
    }
}
