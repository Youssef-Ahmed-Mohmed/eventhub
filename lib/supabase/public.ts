import { createClient } from "@supabase/supabase-js";
import { getSupabaseUrl } from "@/lib/supabase/url";

const url = getSupabaseUrl();
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !publishableKey)
  throw new Error("Supabase public configuration is missing.");

export const publicDb = createClient(url, publishableKey);
