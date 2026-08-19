import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase/server";

const DEFAULT_ADMIN_EMAIL = "ritalagune@gmail.com";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "admin_notification_email")
    .single();

  return NextResponse.json({
    email: data?.value || process.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN_EMAIL,
  });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const supabase = createServiceClient();
  await supabase.from("site_settings").upsert({
    key: "admin_notification_email",
    value: email.trim(),
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, email: email.trim() });
}
