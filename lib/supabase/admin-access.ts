import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { adminDb } from "@/lib/supabase/admin";
import { getSupabaseUrl } from "@/lib/supabase/url";

export type AppRole = "attendee" | "organizer" | "admin";

export async function getCurrentUserRole(userId?: string): Promise<AppRole> {
  const user = userId ? null : await getCurrentUser();
  const id = userId ?? user?.id;
  if (!id) return "attendee";
  const { data } = await adminDb
    .from("profiles")
    .select("role")
    .eq("id", id)
    .maybeSingle();
  return data?.role === "admin" || data?.role === "organizer"
    ? data.role
    : "attendee";
}
export async function isCurrentUserAdmin() {
  return (await getCurrentUserRole()) === "admin";
}

export async function canManageEvents(userId: string) {
  const role = await getCurrentUserRole(userId);
  return role === "admin" || role === "organizer";
}

export async function getCurrentUser() {
  const url = getSupabaseUrl();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server components cannot write response cookies; route handlers can.
        }
      },
    },
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
