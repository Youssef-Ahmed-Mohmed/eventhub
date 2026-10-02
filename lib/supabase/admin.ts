import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl } from "@/lib/supabase/url";

const url = getSupabaseUrl();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey)
  throw new Error("Supabase server configuration is missing.");
export const adminDb = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
