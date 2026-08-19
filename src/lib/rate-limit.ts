import { createServiceClient } from "./supabase/server";

/** Fixed-window rate limiter backed by the rate_limit_hits table. */
export async function rateLimit(
  bucket: string,
  identifier: string,
  { max, windowMs }: { max: number; windowMs: number }
): Promise<{ allowed: boolean }> {
  const supabase = createServiceClient();
  const now = Date.now();

  const { data: existing } = await supabase
    .from("rate_limit_hits")
    .select("count, window_start")
    .eq("bucket", bucket)
    .eq("identifier", identifier)
    .maybeSingle();

  const windowStart = existing ? new Date(existing.window_start).getTime() : now;
  const windowExpired = now - windowStart > windowMs;

  const nextCount = windowExpired || !existing ? 1 : existing.count + 1;
  const nextWindowStart = windowExpired || !existing ? new Date(now).toISOString() : existing.window_start;

  await supabase.from("rate_limit_hits").upsert(
    { bucket, identifier, count: nextCount, window_start: nextWindowStart },
    { onConflict: "bucket,identifier" }
  );

  return { allowed: nextCount <= max };
}
