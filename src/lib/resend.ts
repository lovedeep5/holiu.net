import { Resend } from "resend";
import { createServiceClient } from "./supabase/server";
import {
  renderFreeMeditationEmail,
  renderContactAutoReplyEmail,
  renderPurchaseEmail,
  renderSignupConfirmationEmail,
  renderPasswordResetEmail,
  renderAdminNewLeadEmail,
  renderAdminNewContactEmail,
  renderAdminNewOrderEmail,
} from "./email-templates";

export const resend = new Resend(
  process.env.RESEND_API_KEY || "re_dummy_key_replace_me"
);

const FROM = process.env.RESEND_FROM_EMAIL || "HOLIU <contact@holiu.net>";
const DEFAULT_ADMIN_EMAIL = "ritalagune@gmail.com";

async function getAdminEmail(): Promise<string> {
  try {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "admin_notification_email")
      .single();
    return data?.value || process.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN_EMAIL;
  } catch {
    return process.env.ADMIN_NOTIFICATION_EMAIL || DEFAULT_ADMIN_EMAIL;
  }
}

async function send(to: string, subject: string, html: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Resend] No API key — skipping email to", to);
    return false;
  }
  try {
    await resend.emails.send({ from: FROM, to, subject, html });
    return true;
  } catch (err) {
    console.error("[Resend] Failed to send email to", to, err);
    return false;
  }
}

// ---------- Customer-facing ----------

export async function sendPurchaseEmail({
  to,
  customerName,
  products,
  downloadLinks,
}: {
  to: string;
  customerName?: string;
  products: { name: string }[];
  downloadLinks: { name: string; url: string; expires: string }[];
}) {
  const { subject, html } = renderPurchaseEmail({ customerName, products, downloadLinks });
  await send(to, subject, html);
}

export async function sendFreeMeditationEmail({
  to,
  firstName,
}: {
  to: string;
  firstName?: string | null;
}) {
  const { subject, html } = renderFreeMeditationEmail({ firstName });
  await send(to, subject, html);
}

export async function sendSignupConfirmationEmail({
  to,
  firstName,
  confirmUrl,
}: {
  to: string;
  firstName?: string | null;
  confirmUrl: string;
}): Promise<boolean> {
  const { subject, html } = renderSignupConfirmationEmail({ firstName, confirmUrl });
  return send(to, subject, html);
}

export async function sendPasswordResetEmail({
  to,
  resetUrl,
}: {
  to: string;
  resetUrl: string;
}): Promise<boolean> {
  const { subject, html } = renderPasswordResetEmail({ resetUrl });
  return send(to, subject, html);
}

export async function sendContactAutoReplyEmail({
  to,
  name,
}: {
  to: string;
  name?: string | null;
}) {
  const { subject, html } = renderContactAutoReplyEmail({ name });
  await send(to, subject, html);
}

// ---------- Admin-facing ----------

export async function sendAdminNewLeadEmail({
  name,
  email,
  source,
}: {
  name?: string | null;
  email: string;
  source: string;
}) {
  const adminEmail = await getAdminEmail();
  const { subject, html } = renderAdminNewLeadEmail({ name, email, source });
  await send(adminEmail, subject, html);
}

export async function sendAdminNewContactEmail({
  name,
  email,
  message,
}: {
  name?: string | null;
  email: string;
  message?: string | null;
}) {
  const adminEmail = await getAdminEmail();
  const { subject, html } = renderAdminNewContactEmail({ name, email, message });
  await send(adminEmail, subject, html);
}

export async function sendAdminNewOrderEmail({
  customerEmail,
  products,
}: {
  customerEmail: string;
  products: { name: string; price: number }[];
}) {
  const adminEmail = await getAdminEmail();
  const { subject, html } = renderAdminNewOrderEmail({ customerEmail, products });
  await send(adminEmail, subject, html);
}
