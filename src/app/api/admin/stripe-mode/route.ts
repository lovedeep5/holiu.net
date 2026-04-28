import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET() {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "stripe_test_mode")
    .single();

  return NextResponse.json({ testMode: data?.value === "true" });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { testMode } = await req.json();

  const supabase = createServiceClient();
  await supabase.from("site_settings").upsert({
    key: "stripe_test_mode",
    value: String(Boolean(testMode)),
    updated_at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, testMode: Boolean(testMode) });
}
