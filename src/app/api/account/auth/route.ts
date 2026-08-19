import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createServiceClient } from "@/lib/supabase/server";
import { validatePassword } from "@/lib/password";
import { checkLockout, recordFailedAttempt, clearEmailAttempts, lockoutMessage, getClientIp } from "@/lib/login-security";
import { sendSignupConfirmationEmail } from "@/lib/resend";
import { BASE_URL } from "@/lib/email-templates";

function makeSupabase(req: NextRequest, res: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );
}

/** POST — login or signup */
export async function POST(req: NextRequest) {
  const { mode, email, password, first_name, last_name, name } = await req.json();

  const response = NextResponse.json({ ok: true });
  const supabase = makeSupabase(req, response);

  if (mode === "signup") {
    const pw = validatePassword(String(password ?? ""));
    if (!pw.valid) {
      return NextResponse.json({ error: pw.error }, { status: 400 });
    }

    // Back-compat: accept legacy "name" field
    const parts = name ? String(name).trim().split(/\s+/) : [];
    const fName = first_name ?? parts[0] ?? "";
    const lName = last_name ?? (parts.length > 1 ? parts.slice(1).join(" ") : "");
    const fullName = [fName, lName].filter(Boolean).join(" ");

    // Use the admin API to create the user + generate the confirmation link ourselves,
    // rather than supabase.auth.signUp() (which would trigger Supabase's own built-in
    // confirmation email) — every auth email goes out through our branded Resend templates.
    const serviceClient = createServiceClient();
    const { data, error } = await serviceClient.auth.admin.generateLink({
      type: "signup",
      email,
      password,
      options: {
        data: { first_name: fName, last_name: lName, name: fullName },
        redirectTo: `${BASE_URL}/en/account`,
      },
    });
    if (error || !data?.properties?.action_link) {
      return NextResponse.json({ error: error?.message ?? "Failed to sign up" }, { status: 400 });
    }

    await sendSignupConfirmationEmail({
      to: email,
      firstName: fName,
      confirmUrl: data.properties.action_link,
    });

    return NextResponse.json({
      ok: true,
      message: "Check your email to confirm your account.",
    });
  }

  // login
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const ip = getClientIp(req);
  const lock = await checkLockout(email, ip);
  if (lock.locked) {
    return NextResponse.json({ error: lockoutMessage(lock.unlockAt!) }, { status: 429 });
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const { remaining } = await recordFailedAttempt(email, ip);
    const message =
      remaining > 0
        ? `Invalid credentials. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining before lockout.`
        : "Too many failed attempts. This account is now locked for 24 hours.";
    return NextResponse.json({ error: message }, { status: 401 });
  }

  await clearEmailAttempts(email);
  return response;
}

/** DELETE — logout */
export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  const supabase = makeSupabase(req, response);
  await supabase.auth.signOut();
  return response;
}
