import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // عدل مسار الملف حسب مكان lib عندك
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, date, location, description, status } = body;

        if (!title || !date) {
            return NextResponse.json(
                { message: "Title and Date are required fields" },
                { status: 400 }
            );
        }

        // إضافة الـ Event إلى مجموعة "events" في Firestore
        const docRef = await addDoc(collection(db, "events"), {
            title,
            date,
            location: location || "",
            description: description || "",
            status: status || "Upcoming",
            createdAt: serverTimestamp(),
        });

        return NextResponse.json(
            {
                message: "Event created successfully in Firebase!",
                eventId: docRef.id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Firebase Error:", error);
        return NextResponse.json(
            { message: "Failed to create event" },
            { status: 500 }
        );
    }
}