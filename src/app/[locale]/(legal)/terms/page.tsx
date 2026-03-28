import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <section className="section-padding bg-brand-cream min-h-screen pt-40">
      <div className="container-max" style={{ maxWidth: "760px" }}>
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#2c2520",
            marginBottom: "2rem",
          }}
        >
          Terms &amp; Conditions
        </h1>
        <div
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#7a6f66",
          }}
        >
          <p><strong>Last updated:</strong> January 2025</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>1. Scope</h2>
          <p>These Terms apply to all purchases of digital products from holiu.net, operated by Ruth Heinen.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>2. Digital Products</h2>
          <p>All products sold are digital downloads. Upon successful payment you will receive a time-limited download link via email and on the confirmation page. Downloads are for personal use only and may not be redistributed.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>3. Right of Withdrawal</h2>
          <p>By completing your purchase you expressly consent to immediate delivery of the digital content and acknowledge that the right of withdrawal expires upon delivery of the digital content.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>4. Payment</h2>
          <p>Payments are processed securely by Stripe. Prices include applicable VAT.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>5. Contact</h2>
          <p>Questions? Contact us at info@holiu.net</p>
        </div>
      </div>
    </section>
  );
}
