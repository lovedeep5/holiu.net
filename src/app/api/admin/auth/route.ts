import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { checkLockout, recordFailedAttempt, clearEmailAttempts, lockoutMessage, getClientIp } from "@/lib/login-security";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const ip = getClientIp(req);

  const lock = await checkLockout(email, ip);
  if (lock.locked) {
    return NextResponse.json({ error: lockoutMessage(lock.unlockAt!) }, { status: 429 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    const { remaining } = await recordFailedAttempt(email, ip);
    const message =
      remaining > 0
        ? `Invalid credentials. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining before lockout.`
        : "Too many failed attempts. This account is now locked for 24 hours.";
    return NextResponse.json({ error: message }, { status: 401 });
  }

  // Check if user has admin role in profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  await clearEmailAttempts(email);

  const res = NextResponse.json({ ok: true });

  res.cookies.set("admin_session", data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("admin_session");
  return res;
}
