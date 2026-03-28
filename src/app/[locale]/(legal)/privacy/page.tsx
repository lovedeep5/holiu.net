import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
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
          Privacy Policy
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
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>1. Data Controller</h2>
          <p>Ruth Heinen, HOLIU<br />Contact: info@holiu.net</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>2. Data We Collect</h2>
          <p>We collect personal data only when you make a purchase (name, email, payment info processed by Stripe) or contact us via our contact form (name, email, message).</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>3. How We Use Your Data</h2>
          <p>We use your data to fulfil orders, deliver digital products, and respond to enquiries. We do not sell your data to third parties.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>4. Third-Party Processors</h2>
          <p>Stripe (payments), Supabase (database/storage), Resend (transactional email), Vercel (hosting). All processors comply with GDPR.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>5. Your Rights</h2>
          <p>Under GDPR you have the right to access, correct, delete, or export your personal data. Contact us at info@holiu.net.</p>
          <h2 style={{ color: "#2c2520", marginTop: "2rem", fontFamily: "var(--font-playfair), Georgia, serif" }}>6. Cookies</h2>
          <p>This site uses only essential cookies required for authentication and cart functionality. No tracking or advertising cookies are used.</p>
        </div>
      </div>
    </section>
  );
}
