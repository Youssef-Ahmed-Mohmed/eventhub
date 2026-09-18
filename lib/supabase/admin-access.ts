import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export async function isCurrentUserAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return false;
  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } });
  const { data: { user } } = await supabase.auth.getUser();
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase());
  return Boolean(user?.email && allowed.includes(user.email.toLowerCase()));
}

export async function getCurrentUser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } });
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
