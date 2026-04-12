import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return { title: t("terms") };
}

const h2Style = {
  color: "#2c2520",
  marginTop: "2rem",
  marginBottom: "0.75rem",
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "1.15rem",
};

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
          HOLIU Terms &amp; Conditions
        </h1>
        <div
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "#7a6f66",
          }}
        >
          <p>This agreement is between you the &ldquo;User&rdquo; and HOLIU HOLISTIC LIFESTYLE UNIVERSE (&ldquo;HOLIU&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo; and &ldquo;us&rdquo;). If you do not agree with all of the provisions of this agreement, you cannot use the Services.</p>
          <p style={{ marginTop: "1rem" }}>The use of www.holiu.net is subject to the following terms and conditions. HOLIU reserves the right to update the Terms and Conditions at any time without notice. The most current version can be reviewed by clicking the &lsquo;Terms of service&rsquo; link at the bottom of our webpages.</p>
          <p style={{ marginTop: "1rem" }}><strong>IMPORTANT LEGAL NOTICE:</strong> THE SERVICES PROVIDED BY HOLIU ARE FOR USERS 18 YEARS OF AGE AND ABOVE. WE DO NOT PROVIDE OUR SERVICES TO MINORS.</p>

          <h2 style={h2Style}>Our Services</h2>
          <p>HOLIU carries out its business at Duisburger Strasse 44, 40477 Düsseldorf, Germany. HOLIU operates an ecommerce store for the sale of digital products and provides holistic Chakra Balancing Meditation, Channeling and Coaching services.</p>
          <p style={{ marginTop: "0.75rem" }}>These Terms apply to: (a) the use of any information and services offered via our Website; (b) the order of any HOLIU digital products; (c) the subscription to holistic Chakra Balancing Meditation, Channeling and Coaching services.</p>

          <h2 style={h2Style}>User&apos;s Responsibility</h2>
          <p>The client takes advantage of consultations (coaching packages) or applications that serve the purpose of health care (primary prevention), relaxation, well-being, spiritual Chakra Balancing and personal development. There are no medical examinations, diagnoses, or treatments.</p>
          <p style={{ marginTop: "0.75rem" }}>The client takes responsibility for their own development process. The advice provided is no substitute for treatment by a doctor, alternative practitioner, psychotherapist or physiotherapist. The client undertakes not to use the advice as an opportunity to break off necessary treatments with a doctor or other practitioner.</p>
          <p style={{ marginTop: "0.75rem" }}>Our holistic Chakra Balancing Meditation, Channeling and Coaching services are for over 18&apos;s only unless accompanied by an adult. We reserve the right to refuse to read for anyone who may be deemed as addicted to psychics. You are in control of your own life — we merely offer guidance, not a way out of personal responsibility.</p>

          <h2 style={h2Style}>Bookings</h2>
          <p>To use our holistic services, we charge a fee upon agreement. If you need to defer your booking later than 24 hours before the session, at our discretion a re-booking fee of 50% may be applied.</p>
          <p style={{ marginTop: "0.75rem" }}>If you end up being the only person booked on a particular date, the course may not go ahead. We will try to find an alternative or offer alternate dates. We always aim to give at least one week&apos;s notice should we need to make any changes.</p>

          <h2 style={h2Style}>Payment &amp; Billing</h2>
          <p>Payments for purchases can be made via PayPal, Stripe &amp; Credit cards. By providing a payment method, you represent and warrant that you are authorised to use it and authorise us to charge all applicable amounts. All prices shown are in Euro and include applicable VAT.</p>
          <p style={{ marginTop: "0.75rem" }}>We reserve the right to change our product offerings and adjust prices at any time. Changes to your then-current subscription will be communicated in advance.</p>

          <h2 style={h2Style}>Digital Products</h2>
          <p>All digital products are for personal use only and may not be redistributed. Upon successful payment you will receive access to your purchased content. Certain products or services may be available exclusively online.</p>

          <h2 style={h2Style}>Prohibited Uses</h2>
          <p>You may not use the site: (a) for any unlawful purpose; (b) to violate any regulations or laws; (c) to infringe upon intellectual property rights; (d) to harass, abuse, insult or discriminate; (e) to upload viruses or malicious code; (f) to collect personal information of others; (g) to spam or scrape; or (h) to interfere with the security features of the Service.</p>

          <h2 style={h2Style}>Disclaimer of Warranties</h2>
          <p>Your access to and use of the Services are at YOUR OWN RISK. The Services are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. HOLIU disclaims all warranties and conditions, whether express or implied, of merchantability, fitness for a particular purpose, or non-infringement.</p>

          <h2 style={h2Style}>Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, HOLIU SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES resulting from your access to or use of the Services, any conduct or content of third parties on the Services, or any content obtained from the Services.</p>

          <h2 style={h2Style}>Intellectual Property</h2>
          <p>All brand names, logos, product names, and titles used on the Website are trademarks or trade names of HOLIU or third-party holders. You are not allowed to use or reproduce any such trademarks or trade names. The rights in the Website design, texts, documents, and other material are owned by or licensed to HOLIU.</p>

          <h2 style={h2Style}>Governing Law</h2>
          <p>These Terms and Conditions are governed by and construed in accordance with the laws of Germany. The competent courts in Germany shall have exclusive jurisdiction to resolve any dispute between you and HOLIU.</p>

          <h2 style={h2Style}>Changes to These Terms</h2>
          <p>If HOLIU decides to change these Terms and Conditions, we will post the updated terms on the Website. You are advised to regularly check for changes.</p>

          <p style={{ marginTop: "2rem" }}>
            <strong>Contact:</strong><br />
            HOLIU — Duisburger Strasse 44, 40477 Düsseldorf, Germany<br />
            <a href="mailto:info@holiu.net" style={{ color: "#fc8855" }}>info@holiu.net</a>
          </p>
        </div>
      </div>
    </section>
  );
}
