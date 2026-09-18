"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/subabase/client";

export default function AuthContent() {
    const params = useSearchParams();
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const returnTo = params.get("returnTo") || "/events";
    const redirectTo = `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnTo)}`;

    async function social(provider: "google" | "facebook", instagram = false) {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo, scopes: instagram ? "instagram_basic" : undefined } });
        if (error) { setLoading(false); setMessage(error.message); }
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        const result = mode === "signin"
            ? await supabase.auth.signInWithPassword({ email, password })
            : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
        setLoading(false);
        if (result.error) return setMessage(result.error.message);
        if (mode === "signup" && !result.data.session) return setMessage("Account created. Confirm your email, then sign in.");
        window.location.href = returnTo;
    }

    return (
        <main className="min-h-screen bg-[#070812] px-6 py-16 text-white">
            <div className="mx-auto grid min-h-[680px] max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#101326] shadow-2xl md:grid-cols-2">
                <section className="hidden bg-gradient-to-br from-[#0f172a] via-[#2563eb] to-[#0891b2] p-12 md:block">
                    <p className="text-sm font-bold tracking-[.25em]">NEXUS EVENTS</p>
                    <h1 className="mt-24 text-5xl font-bold leading-tight">Your next unforgettable experience starts here.</h1>
                    <p className="mt-6 max-w-sm text-white/75">One account to explore events, reserve a real seat, pay securely, and keep every pass in one place.</p>
                    <div className="mt-16 grid grid-cols-2 gap-4 text-sm"><div className="rounded-2xl bg-white/10 p-4">Live availability</div><div className="rounded-2xl bg-white/10 p-4">Secure QR tickets</div></div>
                </section>
                <section className="p-8 sm:p-12">
                    <p className="text-sm font-semibold tracking-[.18em] text-cyan-300">WELCOME</p>
                    <h2 className="mt-3 text-3xl font-bold">{mode === "signin" ? "Sign in to continue" : "Create your free account"}</h2>
                    <p className="mt-2 text-sm text-slate-400">Reserve seats, pay, save tickets, or submit your own event.</p>
                    <div className="mt-7 grid gap-3"><button disabled={loading} onClick={() => social("google")} className="rounded-xl border border-white/15 p-3 font-semibold hover:bg-white/10">Continue with Google</button><button disabled={loading} onClick={() => social("facebook")} className="rounded-xl border border-white/15 p-3 font-semibold hover:bg-white/10">Continue with Facebook</button><button disabled={loading} onClick={() => social("facebook", true)} className="rounded-xl border border-white/15 p-3 font-semibold hover:bg-white/10">Continue with Instagram</button></div>
                    <div className="my-6 flex items-center gap-3 text-xs text-slate-500"><span className="h-px flex-1 bg-white/10" />OR WITH EMAIL<span className="h-px flex-1 bg-white/10" /></div>
                    <form onSubmit={submit}><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Email address" className="w-full rounded-xl border border-white/10 bg-black/20 p-3" required /><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" minLength={8} placeholder="Password (8+ characters)" className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 p-3" required /><button disabled={loading} className="mt-5 w-full rounded-xl bg-cyan-300 p-3 font-bold text-slate-950 disabled:opacity-50">{loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}</button></form>
                    <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }} className="mt-5 w-full text-sm text-cyan-300">{mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}</button><p className="mt-4 text-sm text-amber-200">{message}</p>
                </section>
            </div>
        </main>
    );
}