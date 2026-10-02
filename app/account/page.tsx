"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AccountPage() {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function deleteAccount() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.error ?? "Account deletion failed.");
        return;
      }
      await supabase.auth.signOut();
      router.replace("/");
      router.refresh();
    } catch {
      setMessage(
        "The request could not be completed. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070812] px-6 py-28 text-white">
      <section className="mx-auto max-w-xl rounded-3xl border border-red-400/20 bg-[#101326] p-8">
        <p className="text-sm font-bold tracking-[.18em] text-cyan-300">
          ACCOUNT
        </p>
        <h1 className="mt-3 text-3xl font-bold">Delete your account</h1>
        <p className="mt-4 text-slate-300">
          This permanently removes your account and tickets. Type DELETE to
          confirm.
        </p>
        <input
          aria-label="Type DELETE to confirm"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          className="mt-6 w-full rounded-xl border border-white/10 bg-black/20 p-3"
        />
        <button
          disabled={loading || confirmation !== "DELETE"}
          onClick={deleteAccount}
          className="mt-4 rounded-xl bg-red-500 px-5 py-3 font-bold text-white disabled:opacity-40"
        >
          {loading ? "Deleting…" : "Delete account permanently"}
        </button>
        <p role="status" className="mt-4 text-sm text-red-200">
          {message}
        </p>
      </section>
    </main>
  );
}
