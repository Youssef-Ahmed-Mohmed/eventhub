import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

if (!getApps().length) {
    try {
        initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey,
            }),
        });
    } catch (error) {
        console.error("Firebase Admin Initialization Error:", error);
    }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();