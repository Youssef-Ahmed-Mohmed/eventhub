import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) throw new Error("Supabase server configuration is missing.");
export const adminDb = createClient(url, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

export function isAdmin(user: { email?: string | null }) {
  const emails = (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase());
  return Boolean(user.email && emails.includes(user.email.toLowerCase()));
}
