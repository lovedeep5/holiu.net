import { Resend } from "resend";

export const resend = new Resend(
  process.env.RESEND_API_KEY || "re_dummy_key_replace_me"
);

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
  if (!process.env.RESEND_API_KEY) {
    console.log("[Resend] No API key — skipping email to", to);
    return;
  }

  const productList = products.map((p) => `<li>${p.name}</li>`).join("");
  const linkList = downloadLinks
    .map(
      (l) =>
        `<li><strong>${l.name}</strong><br>
         <a href="${l.url}">${l.url}</a><br>
         <small>Expires: ${l.expires}</small></li>`
    )
    .join("");

  await resend.emails.send({
    from: "HOLIU <noreply@holiu.net>",
    to,
    subject: "Your HOLIU purchase — download links inside",
    html: `
      <h2>Thank you${customerName ? `, ${customerName}` : ""}!</h2>
      <p>Your purchase was successful. Here are your downloads:</p>
      <ul>${linkList}</ul>
      <p>Links are valid for 72 hours. You can also access them anytime by logging into your account.</p>
      <hr>
      <p style="color:#888;font-size:12px">HOLIU — Discover the treasure inside of you</p>
    `,
  });
}
