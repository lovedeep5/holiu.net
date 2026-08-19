import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getClientIp } from "@/lib/login-security";
import { rateLimit } from "@/lib/rate-limit";
import { sendPasswordResetEmail } from "@/lib/resend";
import { BASE_URL } from "@/lib/email-templates";

const GENERIC_MESSAGE = "If that email is registered, we've sent a password reset link.";

export async function POST(req: NextRequest) {
  const { email } = await req.json().catch(() => ({}));

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const ip = getClientIp(req);
  if (ip !== "unknown") {
    const { allowed } = await rateLimit("forgot-password", ip, { max: 5, windowMs: 60 * 60 * 1000 });
    if (!allowed) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }
  }

  // Always return the same generic response, whether or not the email is registered,
  // so this endpoint can't be used to discover which emails have accounts.
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email: email.trim(),
      options: { redirectTo: `${BASE_URL}/en/account/reset-password` },
    });
    if (!error && data?.properties?.action_link) {
      await sendPasswordResetEmail({ to: email.trim(), resetUrl: data.properties.action_link });
    }
  } catch (err) {
    console.error("[forgot-password]", err);
  }

  return NextResponse.json({ ok: true, message: GENERIC_MESSAGE });
}
