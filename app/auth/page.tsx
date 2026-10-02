import { Suspense } from "react";
import AuthContent from "./AuthContent";

export default function AuthPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#070812]" />}>
      <AuthContent />
    </Suspense>
  );
}
