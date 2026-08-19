import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OptinModal from "@/components/ui/OptinModal";
import BackgroundMusic from "@/components/ui/BackgroundMusic";
import { OG_IMAGE } from "@/lib/seo";

const SITE_NAME = "HOLIU";
const SITE_TITLE = "HOLIU — Discover the Treasure Inside of You";
const SITE_DESCRIPTION =
  "Spiritual wellness courses, meditations, chakra balancing and channeling sessions by Ruth Heinen. Discover the treasure inside of you.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.holiu.net"),
  title: {
    default: SITE_TITLE,
    template: "%s | HOLIU",
  },
  description: SITE_DESCRIPTION,
  keywords: ["meditation", "spiritual", "wellness", "chakra", "channeling", "courses"],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.holiu.net",
    siteName: SITE_NAME,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HOLIU",
  url: "https://www.holiu.net",
  logo: "https://www.holiu.net/images/logo-dark.png",
  description: SITE_DESCRIPTION,
  founder: {
    "@type": "Person",
    name: "Ruth Heinen",
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HOLIU",
  url: "https://www.holiu.net",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const headersList = await headers();
  const isAdmin = headersList.get("x-is-admin") === "1";

  return (
    <div
      lang={locale}
      className={isAdmin ? "min-h-screen" : "min-h-screen flex flex-col bg-brand-cream"}
    >
      <NextIntlClientProvider messages={messages}>
        {isAdmin ? (
          children
        ) : (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
            />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <OptinModal />
            <BackgroundMusic />
          </>
        )}
      </NextIntlClientProvider>
    </div>
  );
}
