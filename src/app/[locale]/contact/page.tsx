import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("label") };
}

export default function ContactPage() {
  return <ContactForm />;
}
