import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json(
        { error: "استخدم مسار التحقق من QR لإتمام تسجيل الدخول" },
        { status: 410 },
    );
}
