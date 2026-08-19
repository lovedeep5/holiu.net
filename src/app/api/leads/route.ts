import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { getClientIp } from "@/lib/login-security";
import { rateLimit } from "@/lib/rate-limit";
import {
  sendAdminNewLeadEmail,
  sendAdminNewContactEmail,
  sendFreeMeditationEmail,
  sendContactAutoReplyEmail,
} from "@/lib/resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LEN = 100;
const MAX_MESSAGE_LEN = 5000;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (ip !== "unknown") {
      const { allowed } = await rateLimit("leads", ip, { max: 10, windowMs: 60 * 60 * 1000 });
      if (!allowed) {
        return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
      }
    }

    const body = await req.json();
    const { first_name, last_name, email, message, source = "contact" } = body;

    // Back-compat: accept "name" if first_name/last_name not provided
    const fallbackName: string | undefined = body.name;
    const parts = fallbackName ? fallbackName.trim().split(/\s+/) : [];
    const fName = first_name ?? parts[0] ?? null;
    const lName = last_name ?? (parts.length > 1 ? parts.slice(1).join(" ") : null);

    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }
    if (fName && String(fName).length > MAX_NAME_LEN) {
      return NextResponse.json({ error: "Name is too long" }, { status: 400 });
    }
    if (lName && String(lName).length > MAX_NAME_LEN) {
      return NextResponse.json({ error: "Name is too long" }, { status: 400 });
    }
    if (message && String(message).length > MAX_MESSAGE_LEN) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    const fullName = [fName, lName].filter(Boolean).join(" ") || null;

    const supabase = createServiceClient();
    const { error } = await supabase
      .from("leads")
      .insert({
        name: fullName,
        email,
        message,
        source,
      });

    if (error) {
      console.error("[leads]", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    if (source === "contact") {
      await sendAdminNewContactEmail({ name: fullName, email, message });
      await sendContactAutoReplyEmail({ to: email, name: fName });
    } else {
      await sendAdminNewLeadEmail({ name: fullName, email, source });
      await sendFreeMeditationEmail({ to: email, firstName: fName });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
