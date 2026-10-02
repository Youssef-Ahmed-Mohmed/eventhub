"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
const initial = {
  title: "",
  event_date: "",
  location: "",
  description: "",
  category: "Technology",
  ticket_price: "0",
  capacity: "100",
};
export default function CreateEvent() {
  const router = useRouter();
  const [form, setForm] = useState(initial),
    [message, setMessage] = useState(""),
    [loading, setLoading] = useState(false),
    [authReady, setAuthReady] = useState(false);
  useEffect(() => {
    let isActive = true;
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isActive) return;
      if (session) {
        setAuthReady(true);
        return;
      }
      if (event === "SIGNED_OUT") {
        router.replace("/auth?returnTo=/create-event");
      }
    });

    supabase.auth
      .getSession()
      .then(({ data: sessionData, error }) => {
        if (!isActive) return;
        if (error) {
          setMessage(
            "Could not check your sign-in session. Please refresh and try again.",
          );
          return;
        }
        if (sessionData.session) {
          setAuthReady(true);
          return;
        }
        router.replace("/auth?returnTo=/create-event");
      })
      .catch(() => {
        if (isActive) {
          setMessage(
            "Could not check your sign-in session. Please refresh and try again.",
          );
        }
      });

    return () => {
      isActive = false;
      data.subscription.unsubscribe();
    };
  }, [router]);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (response.status === 401) {
        router.replace("/auth?returnTo=/create-event&error=session");
        return;
      }
      if (!response.ok) {
        setMessage(result.error || "Could not submit event.");
        return;
      }
      setForm(initial);
      setMessage(
        "Submitted successfully. Your event is under review and its seats are ready.",
      );
    } catch {
      setMessage(
        "The event could not be submitted. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  const input = (key: keyof typeof form, label: string, type = "text") => (
    <label className="block text-sm text-slate-300">
      {label}
      <input
        required
        value={form[key]}
        type={type}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-3"
      />
    </label>
  );
  if (!authReady) {
    return (
      <main className="min-h-screen bg-[#070812] px-6 py-28 text-white">
        <div className="mx-auto max-w-3xl">
          <p role="status" className="text-slate-300">
            {message || "Checking your sign-in session..."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070812] px-6 py-28 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold tracking-[.2em] text-cyan-300">
          HOST WITH EVENTSHUB
        </p>
        <h1 className="mt-3 text-4xl font-bold">Submit your event</h1>
        <p className="mt-3 text-slate-400">
          We create seat inventory automatically. Your event stays under review
          until approved.
        </p>
        <form
          onSubmit={submit}
          className="mt-8 grid gap-5 rounded-3xl border border-white/10 bg-[#101326] p-7 md:grid-cols-2"
        >
          {input("title", "Event title")}{" "}
          {input("event_date", "Date & time", "datetime-local")}{" "}
          {input("location", "Venue or online location")}
          <label className="block text-sm text-slate-300">
            Category
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 p-3"
            >
              {[
                "Technology",
                "Music",
                "Business",
                "Design",
                "Sports",
                "Education",
                "Arts",
                "Community",
              ].map((value) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm text-slate-300 md:col-span-2">
            Event description
            <textarea
              required
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="mt-2 min-h-28 w-full rounded-xl border border-white/10 bg-black/20 p-3"
            />
          </label>
          {input("ticket_price", "Ticket price (EGP)", "number")}
          {input("capacity", "Number of seats", "number")}
          <button
            disabled={loading}
            className="rounded-xl bg-cyan-300 p-3 font-bold text-slate-950 md:col-span-2"
          >
            {loading ? "Submitting…" : "Submit for review"}
          </button>
          <p className="text-sm text-cyan-200 md:col-span-2">{message}</p>
        </form>
      </div>
    </main>
  );
}
