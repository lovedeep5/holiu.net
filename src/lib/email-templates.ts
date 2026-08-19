// Always the real public domain — emails are read by clients (Gmail, etc.) that
// can't reach a localhost dev URL, regardless of which environment sent them.
// Use the canonical www host directly (holiu.net 308-redirects here) so image
// embeds don't depend on a mail client following redirects.
export const BASE_URL = "https://www.holiu.net";

// User-supplied values (names, emails, messages) are interpolated into raw HTML
// strings here, not rendered through React, so they must be escaped by hand.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatPrice(cents: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}

function shell(bodyHtml: string) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#fdf0ea;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf0ea;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#ffffff;padding:28px 32px;text-align:center;border-bottom:1px solid rgba(163,141,81,0.15);">
                <img src="${BASE_URL}/images/logo-dark-opt.png" alt="HOLIU" height="38" style="height:38px;width:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#fdf0ea;text-align:center;">
                <p style="margin:0;font-size:11px;color:#a89a89;letter-spacing:0.04em;">HOLIU &mdash; Discover the Treasure Inside of You</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function button(label: string, url: string) {
  return `<a href="${url}" style="display:inline-block;background:#fc8855;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.02em;padding:14px 28px;border-radius:8px;">${label}</a>`;
}

function heading(text: string) {
  return `<h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:26px;color:#2c2520;">${text}</h1>`;
}

function paragraph(text: string) {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#5a4a3a;">${text}</p>`;
}

// ---------- Customer-facing ----------

export function renderFreeMeditationEmail({ firstName }: { firstName?: string | null }) {
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";
  const html = shell(`
    ${heading("Your Free Chakra Meditation 🎧")}
    ${paragraph(greeting)}
    ${paragraph("Thank you for signing up! Your free chakra meditation is ready &mdash; just tap below to download it and start finding a little more peace today.")}
    <div style="text-align:center;margin:28px 0;">
      ${button("Download Your Meditation ↓", `${BASE_URL}/audio/chakra-meditation.mp3`)}
    </div>
    ${paragraph("You can also access it anytime by visiting our website and returning to the free meditation page.")}
    ${paragraph("With love,<br>Ruth ❤")}
  `);
  return { subject: "Your Free Chakra Meditation 🎧", html };
}

export function renderSignupConfirmationEmail({
  firstName,
  confirmUrl,
}: {
  firstName?: string | null;
  confirmUrl: string;
}) {
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";
  const html = shell(`
    ${heading("Confirm Your Account 🌸")}
    ${paragraph(greeting)}
    ${paragraph("Thanks for creating a HOLIU account! Please confirm your email address to activate it.")}
    <div style="text-align:center;margin:28px 0;">
      ${button("Confirm My Account →", confirmUrl)}
    </div>
    ${paragraph("If you didn't create this account, you can safely ignore this email.")}
    ${paragraph("With love,<br>Ruth ❤")}
  `);
  return { subject: "Confirm Your HOLIU Account 🌸", html };
}

export function renderPasswordResetEmail({ resetUrl }: { resetUrl: string }) {
  const html = shell(`
    ${heading("Reset Your Password 🔑")}
    ${paragraph("Hi,")}
    ${paragraph("We received a request to reset your HOLIU account password. Click below to choose a new one.")}
    <div style="text-align:center;margin:28px 0;">
      ${button("Reset My Password →", resetUrl)}
    </div>
    ${paragraph("This link will expire soon. If you didn't request this, you can safely ignore this email — your password won't be changed.")}
  `);
  return { subject: "Reset Your HOLIU Password 🔑", html };
}

export function renderContactAutoReplyEmail({ name }: { name?: string | null }) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";
  const html = shell(`
    ${heading("We Received Your Message 💌")}
    ${paragraph(greeting)}
    ${paragraph("Thank you for reaching out to HOLIU. Ruth personally reads every message and will get back to you as soon as she can.")}
    ${paragraph("In the meantime, feel free to explore our free meditations and courses.")}
    <div style="text-align:center;margin:28px 0;">
      ${button("Visit HOLIU", BASE_URL)}
    </div>
    ${paragraph("With love,<br>Ruth ❤")}
  `);
  return { subject: "We received your message 💌", html };
}

export function renderPurchaseEmail({
  customerName,
  products,
  downloadLinks,
}: {
  customerName?: string;
  products: { name: string }[];
  downloadLinks: { name: string; url: string; expires: string }[];
}) {
  const greeting = customerName ? `Hi ${escapeHtml(customerName)},` : "Hi,";
  const items = downloadLinks
    .map(
      (l) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid rgba(163,141,81,0.15);">
          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#2c2520;">${escapeHtml(l.name)}</p>
          <p style="margin:0 0 10px;font-size:12px;color:#a89a89;">Link expires: ${l.expires}</p>
          ${button("Download ↓", l.url)}
        </td>
      </tr>`
    )
    .join("");

  const html = shell(`
    ${heading("Thank You For Your Purchase 🌸")}
    ${paragraph(greeting)}
    ${paragraph("Your order was successful! Here " + (downloadLinks.length > 1 ? "are your downloads" : "is your download") + ":")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${items}</table>
    ${paragraph("You can also access your downloads anytime by logging into your account.")}
    ${paragraph("With love,<br>Ruth ❤")}
  `);
  return { subject: "Your HOLIU purchase — download links inside", html };
}

// ---------- Admin-facing ----------

export function renderAdminNewLeadEmail({
  name,
  email,
  source,
}: {
  name?: string | null;
  email: string;
  source: string;
}) {
  const sourceLabel = source === "popup" ? "Exit popup" : "Get Started page";
  const html = shell(`
    ${heading("🌸 New Free Meditation Signup")}
    ${paragraph(`<strong>Name:</strong> ${name ? escapeHtml(name) : "—"}`)}
    ${paragraph(`<strong>Email:</strong> ${escapeHtml(email)}`)}
    ${paragraph(`<strong>Source:</strong> ${sourceLabel}`)}
    <div style="text-align:center;margin:28px 0;">
      ${button("View All Leads", `${BASE_URL}/en/admin/leads`)}
    </div>
  `);
  return { subject: "🌸 New Free Meditation Signup", html };
}

export function renderAdminNewContactEmail({
  name,
  email,
  message,
}: {
  name?: string | null;
  email: string;
  message?: string | null;
}) {
  const html = shell(`
    ${heading("📩 New Contact Form Message")}
    ${paragraph(`<strong>Name:</strong> ${name ? escapeHtml(name) : "—"}`)}
    ${paragraph(`<strong>Email:</strong> ${escapeHtml(email)}`)}
    ${paragraph(`<strong>Message:</strong><br>${escapeHtml(message || "—").replace(/\n/g, "<br>")}`)}
    <div style="text-align:center;margin:28px 0;">
      ${button("View All Messages", `${BASE_URL}/en/admin/leads`)}
    </div>
  `);
  return { subject: "📩 New Contact Form Message", html };
}

export function renderAdminNewOrderEmail({
  customerEmail,
  products,
}: {
  customerEmail: string;
  products: { name: string; price: number }[];
}) {
  const total = products.reduce((sum, p) => sum + p.price, 0);
  const items = products.map((p) => `<li style="margin-bottom:4px;">${escapeHtml(p.name)} — ${formatPrice(p.price)}</li>`).join("");
  const html = shell(`
    ${heading(`💰 New Order — ${formatPrice(total)}`)}
    ${paragraph(`<strong>Customer:</strong> ${escapeHtml(customerEmail)}`)}
    ${paragraph(`<strong>Products:</strong>`)}
    <ul style="margin:0 0 16px;padding-left:20px;font-size:15px;line-height:1.7;color:#5a4a3a;">${items}</ul>
    <div style="text-align:center;margin:28px 0;">
      ${button("View All Orders", `${BASE_URL}/en/admin/orders`)}
    </div>
  `);
  return { subject: `💰 New Order — ${formatPrice(total)}`, html };
}
