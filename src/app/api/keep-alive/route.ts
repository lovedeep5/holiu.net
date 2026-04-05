import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// Called by Vercel cron every 3 days to prevent Supabase free-tier pause
export async function GET() {
  const supabase = createServiceClient();

  // Insert a dummy record then immediately delete it
  const { data, error: insertError } = await supabase
    .from("leads")
    .insert({ email: "keepalive@system.internal", source: "cron", name: "cron", message: "keep-alive" })
    .select("id")
    .single();

  if (insertError) {
    return NextResponse.json({ ok: false, error: insertError.message }, { status: 500 });
  }

  const { error: deleteError } = await supabase
    .from("leads")
    .delete()
    .eq("id", data.id);

  if (deleteError) {
    return NextResponse.json({ ok: false, error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, ts: new Date().toISOString() });
}
