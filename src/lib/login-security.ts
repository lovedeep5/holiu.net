import { createServiceClient } from "./supabase/server";

const MAX_ATTEMPTS = 3;
const LOCK_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function getClientIp(req: { headers: Headers }): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function checkLockout(
  email: string,
  ip: string
): Promise<{ locked: boolean; unlockAt?: string }> {
  const supabase = createServiceClient();
  // Skip the IP dimension when it can't be determined (e.g. no proxy header in local dev) —
  // otherwise every request without a real client IP would share one "unknown" lock bucket.
  const values = ip === "unknown" ? [email.toLowerCase()] : [email.toLowerCase(), ip];
  const { data } = await supabase
    .from("login_attempts")
    .select("locked_until")
    .in("identifier_value", values)
    .not("locked_until", "is", null);

  const now = Date.now();
  let unlockAt: string | undefined;
  for (const row of data ?? []) {
    if (row.locked_until && new Date(row.locked_until).getTime() > now) {
      if (!unlockAt || new Date(row.locked_until).getTime() > new Date(unlockAt).getTime()) {
        unlockAt = row.locked_until;
      }
    }
  }
  return unlockAt ? { locked: true, unlockAt } : { locked: false };
}

/** Records a failed attempt for both the email and the IP. Returns attempts remaining for the email. */
export async function recordFailedAttempt(email: string, ip: string): Promise<{ remaining: number }> {
  const supabase = createServiceClient();
  let remaining = MAX_ATTEMPTS;

  const pairs: readonly ["email" | "ip", string][] =
    ip === "unknown" ? [["email", email.toLowerCase()]] : [["email", email.toLowerCase()], ["ip", ip]];

  for (const [type, value] of pairs) {
    const { data: existing } = await supabase
      .from("login_attempts")
      .select("attempt_count")
      .eq("identifier_type", type)
      .eq("identifier_value", value)
      .maybeSingle();

    const nextCount = (existing?.attempt_count ?? 0) + 1;
    const lockedUntil = nextCount >= MAX_ATTEMPTS ? new Date(Date.now() + LOCK_DURATION_MS).toISOString() : null;

    await supabase.from("login_attempts").upsert(
      {
        identifier_type: type,
        identifier_value: value,
        attempt_count: nextCount,
        locked_until: lockedUntil,
        last_attempt_at: new Date().toISOString(),
      },
      { onConflict: "identifier_type,identifier_value" }
    );

    if (type === "email") {
      remaining = Math.max(0, MAX_ATTEMPTS - nextCount);
    }
  }

  return { remaining };
}

/** Clears the failed-attempt counter for an email on successful login. IP counters are left alone. */
export async function clearEmailAttempts(email: string): Promise<void> {
  const supabase = createServiceClient();
  await supabase
    .from("login_attempts")
    .delete()
    .eq("identifier_type", "email")
    .eq("identifier_value", email.toLowerCase());
}

export function lockoutMessage(unlockAt: string): string {
  const date = new Date(unlockAt);
  return `Too many failed attempts. Try again after ${date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  })}.`;
}
