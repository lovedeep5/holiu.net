import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "./ContactForm";
import { buildAlternates, OG_IMAGE } from "@/lib/seo";
import HreflangLinks from "@/components/seo/HreflangLinks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const description =
    locale === "de"
      ? "Kontaktiere Ruth Heinen von HOLIU bei Fragen zu Kursen, Meditationen oder persönlichen Channeling-Sitzungen."
      : "Get in touch with Ruth Heinen at HOLIU for questions about courses, meditations, or personalized channeling sessions.";
  return {
    title: t("label"),
    description,
    alternates: buildAlternates(locale, "/contact"),
    openGraph: { title: t("label"), description, images: [OG_IMAGE] },
  };
}

export default function ContactPage() {
  return (
    <>
      <HreflangLinks path="/contact" />
      <ContactForm />
    </>
  );
}
