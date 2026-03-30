import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OptinModal from "@/components/ui/OptinModal";

export const metadata: Metadata = {
  title: {
    default: "HOLIU — Discover the Treasure Inside of You",
    template: "%s | HOLIU",
  },
  description:
    "Spiritual wellness courses, meditations, chakra balancing and channeling sessions by Ruth Heinen. Discover the treasure inside of you.",
  keywords: ["meditation", "spiritual", "wellness", "chakra", "channeling", "courses"],
  openGraph: {
    title: "HOLIU — Discover the Treasure Inside of You",
    description:
      "Spiritual wellness courses, meditations, chakra balancing and channeling sessions by Ruth Heinen.",
    url: "https://holiu.net",
    siteName: "HOLIU",
    type: "website",
  },
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
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <OptinModal />
          </>
        )}
      </NextIntlClientProvider>
    </div>
  );
}
