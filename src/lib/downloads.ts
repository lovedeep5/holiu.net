import crypto from "crypto";

const SECRET = process.env.DOWNLOAD_TOKEN_SECRET || "holiu-download-secret-change-in-production";

/** Generate a signed download token tied to an order_item_id */
export function generateDownloadToken(orderItemId: string): string {
  const payload = `${orderItemId}:${Date.now()}:${crypto.randomBytes(16).toString("hex")}`;
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

/** Verify token structure (DB validation is the real check) */
export function verifyTokenFormat(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(":");
    if (parts.length < 4) return false;
    const sig = parts.pop()!;
    const payload = parts.join(":");
    const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

/** 72 hours from now */
export function tokenExpiry(): Date {
  return new Date(Date.now() + 72 * 60 * 60 * 1000);
}
