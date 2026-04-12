import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return { title: t("privacy") };
}

const h2Style = {
  color: "#2c2520",
  marginTop: "2rem",
  marginBottom: "0.75rem",
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontSize: "1.15rem",
};

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
          <p><strong>Effective Date:</strong> January 1, 2021</p>

          <p style={{ marginTop: "1rem" }}>
            HOLIU (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website holiu.net (the &ldquo;Site&rdquo;). Please read this privacy policy carefully. If you disagree with its terms, please discontinue use of the Site.
          </p>

          <h2 style={h2Style}>Information We Collect</h2>
          <p>We may collect information about you in various ways. The information we may collect on the Site includes:</p>
          <p style={{ marginTop: "0.75rem" }}><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</p>
          <p style={{ marginTop: "0.75rem" }}><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</p>
          <p style={{ marginTop: "0.75rem" }}><strong>Financial Data:</strong> Financial information, such as data related to your payment method (e.g. valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site. We store only very limited, if any, financial information that we collect. Otherwise, all financial information is stored by our payment processor, Stripe, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.</p>

          <h2 style={h2Style}>Use of Cookies</h2>
          <p>We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customise the Site and improve your experience. When you access the Site, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.</p>

          <h2 style={h2Style}>How We Use Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customised experience. Specifically, we may use information collected about you via the Site to:</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
            <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
            <li>Create and manage your account.</li>
            <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.</li>
            <li>Email you regarding your account or order.</li>
            <li>Enable user-to-user communications.</li>
            <li>Fulfil and manage purchases, orders, payments, and other transactions related to the Site.</li>
            <li>Increase the efficiency and operation of the Site.</li>
            <li>Monitor and analyse usage and trends to improve your experience with the Site.</li>
            <li>Notify you of updates to the Site.</li>
            <li>Process payments and refunds.</li>
            <li>Request feedback and contact you about your use of the Site.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
            <li>Send you a newsletter.</li>
          </ul>

          <h2 style={h2Style}>Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>
          <p style={{ marginTop: "0.75rem" }}><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</p>
          <p style={{ marginTop: "0.75rem" }}><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</p>
          <p style={{ marginTop: "0.75rem" }}><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>

          <h2 style={h2Style}>Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

          <h2 style={h2Style}>Policy for Children</h2>
          <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>

          <h2 style={h2Style}>Retention of Your Information</h2>
          <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</p>

          <h2 style={h2Style}>Your Rights Under BDSG and GDPR</h2>
          <p>If you are a resident of Germany or the European Economic Area, you have certain rights under the Federal Data Protection Act (BDSG) and the General Data Protection Regulation (GDPR), including:</p>
          <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
            <li>The right to access personal information we hold about you.</li>
            <li>The right to request correction of inaccurate data.</li>
            <li>The right to request erasure of your data.</li>
            <li>The right to object to or restrict processing of your data.</li>
            <li>The right to data portability.</li>
            <li>The right to withdraw consent at any time.</li>
          </ul>
          <p style={{ marginTop: "0.75rem" }}>To exercise these rights, please contact us at info@holiu.net.</p>

          <h2 style={h2Style}>Google Analytics</h2>
          <p>We may use Google Analytics to track and analyse website traffic. Google Analytics collects information such as how often users visit the Site, what pages they visit, and what other sites they used prior to coming to the Site. We use this information to improve the Site. Google&apos;s ability to use and share information collected by Google Analytics about your visits to the Site is restricted by the Google Analytics Terms of Service and the Google Privacy Policy. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.</p>

          <h2 style={h2Style}>Securing Your Privacy</h2>
          <p>We take your privacy very seriously. If you have questions or concerns regarding this policy, or if you believe we have not adhered to this policy, please contact us at:</p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>HOLIU</strong><br />
            Duisburger Strasse 44<br />
            40477 Düsseldorf, Germany<br />
            Email: <a href="mailto:info@holiu.net" style={{ color: "#fc8855" }}>info@holiu.net</a>
          </p>

          <h2 style={h2Style}>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. We encourage you to periodically review this page for the latest information on our privacy practices.</p>
        </div>
      </div>
    </section>
  );
}
