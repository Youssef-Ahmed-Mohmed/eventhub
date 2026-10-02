export function getSupabaseUrl(value = process.env.NEXT_PUBLIC_SUPABASE_URL) {
  if (!value) return null;

  try {
    const url = new URL(value);
    const pathname = url.pathname.replace(/\/+$/, "");

    // Supabase clients expect the project URL, not its REST endpoint.
    if (pathname === "/rest/v1") {
      url.pathname = "";
    }

    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    return null;
  }
}
