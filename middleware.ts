import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseUrl } from "@/lib/supabase/url";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  const url = getSupabaseUrl();
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return NextResponse.redirect(
      new URL("/admin/login?error=configuration", request.url),
    );
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookies) => {
        cookies.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookies.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/admin/login", request.url));
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin" && profile?.role !== "organizer") {
    return NextResponse.redirect(
      new URL("/auth?error=not-authorized", request.url),
    );
  }

  return response;
}

export const config = { matcher: ["/dashboard/:path*"] };
