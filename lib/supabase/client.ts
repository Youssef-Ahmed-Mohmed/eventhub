import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseUrl } from "@/lib/supabase/url";

export function createClient() {
  const url = getSupabaseUrl();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey)
    throw new Error("Supabase browser configuration is missing.");
  return createBrowserClient(url, publishableKey);
}

export const supabase = createClient();
