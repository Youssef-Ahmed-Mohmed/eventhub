import { createBrowserClient } from "@supabase/ssr";

// Cookie-backed browser client: server pages and middleware can now see the same session.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);
