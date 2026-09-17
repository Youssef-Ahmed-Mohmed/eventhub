import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { adminDb } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

const SECRET_KEY = process.env.QR_SECRET_KEY || "default_fallback_secret";

export async function POST(req: Request) {
    try {
        const { qrToken } = await req.json();

        if (!qrToken) {
            return NextResponse.json({ error: "Token مفقود" }, { status: 400 });
        }

        // 1. فك التشفير والتحقق من التوقيع الرقمي
        let decoded: any;
        try {
            decoded = jwt.verify(qrToken, SECRET_KEY);
        } catch (err) {
            return NextResponse.json({ error: "تذكرة غير صالحة أو مزورة!" }, { status: 401 });
        }

        const { ticketId, eventId } = decoded;

        // 2. فحص حالة التذكرة في قاعدة البيانات عبر Firebase Admin Transaction
        const ticketRef = adminDb.doc(`events/${eventId}/tickets/${ticketId}`);
        const eventRef = adminDb.doc(`events/${eventId}`);

        const result = await adminDb.runTransaction(async (transaction: { get: (arg0: any) => any; update: (arg0: any, arg1: { status?: string; scannedAt?: string; liveAttendanceCount?: FieldValue; }) => void; }) => {
            const ticketDoc = await transaction.get(ticketRef);

            if (!ticketDoc.exists) {
                throw new Error("التذكرة غير مسجلة بالنظام");
            }

            const ticketData = ticketDoc.data();

            if (ticketData?.status === "used") {
                throw new Error("تنبيه: تم استخدام هذه التذكرة للدخول من قبل!");
            }

            // 3. تحديث حالة التذكرة إلى Used وزيادة عداد الحضور اللحظي
            transaction.update(ticketRef, {
                status: "used",
                scannedAt: new Date().toISOString(),
            });

            transaction.update(eventRef, {
                liveAttendanceCount: FieldValue.increment(1),
            });

            return ticketData;
        });

        return NextResponse.json({
            success: true,
            message: "تم تأكيد الدخول بنجاح! مرحبا بك.",
            ticketDetails: result,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}