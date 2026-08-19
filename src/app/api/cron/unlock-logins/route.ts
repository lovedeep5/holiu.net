import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// Runs daily via Vercel Cron. The 24h lockout is actually enforced by comparing
// locked_until to now() on every login attempt, so this isn't load-bearing for
// security — it just clears out rows whose lock has already expired, plus stale
// rate-limit rows, so both tables don't grow unbounded.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const now = new Date().toISOString();

  const { data: unlocked, error: unlockError } = await supabase
    .from("login_attempts")
    .delete()
    .lt("locked_until", now)
    .select("id");

  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: rateCleared, error: rateError } = await supabase
    .from("rate_limit_hits")
    .delete()
    .lt("window_start", dayAgo)
    .select("bucket");

  if (unlockError || rateError) {
    return NextResponse.json({ ok: false, error: unlockError?.message || rateError?.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    unlocked: unlocked?.length ?? 0,
    rateLimitRowsCleared: rateCleared?.length ?? 0,
    ts: now,
  });
}
