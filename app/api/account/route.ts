import { NextResponse } from "next/server";
import { adminDb } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/supabase/admin-access";
import { accountDeleteSchema } from "@/lib/validation";

export async function DELETE(request: Request) {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json(
      { error: "Sign in to delete your account." },
      { status: 401 },
    );

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
  const validation = accountDeleteSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: "Type DELETE to confirm account removal." },
      { status: 400 },
    );
  }

  const { error } = await adminDb.auth.admin.deleteUser(user.id);
  if (error)
    return NextResponse.json(
      { error: "Could not delete your account. Please try again." },
      { status: 500 },
    );
  return NextResponse.json({ success: true });
}
