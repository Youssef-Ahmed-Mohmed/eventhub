import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseUrl } from "@/lib/supabase/url";
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const requestedPath = url.searchParams.get("returnTo") || "/events";
  const returnTo =
    requestedPath.startsWith("/") && !requestedPath.startsWith("//")
      ? requestedPath
      : "/events";
  const response = NextResponse.redirect(new URL(returnTo, url.origin));
  const providerError =
    url.searchParams.get("error_description") ??
    url.searchParams.get("error") ??
    url.searchParams.get("error_code");
  if (!code) {
    const errorUrl = new URL("/auth", url.origin);
    errorUrl.searchParams.set("error", "callback");
    errorUrl.searchParams.set("returnTo", returnTo);
    if (providerError) {
      errorUrl.searchParams.set("reason", providerError.slice(0, 240));
    }
    return NextResponse.redirect(errorUrl);
  }

  const supabaseUrl = getSupabaseUrl();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !publishableKey)
    return NextResponse.redirect(
      new URL("/auth?error=configuration", url.origin),
    );

  const supabase = createServerClient(supabaseUrl, publishableKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (items) =>
        items.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        ),
    },
  });
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    const errorUrl = new URL("/auth", url.origin);
    errorUrl.searchParams.set("error", "callback");
    errorUrl.searchParams.set("returnTo", returnTo);
    errorUrl.searchParams.set("reason", error.message.slice(0, 240));
    return NextResponse.redirect(errorUrl);
  }
  return response;
}
