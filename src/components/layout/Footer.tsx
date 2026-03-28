"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  const shopLinks = [
    { href: "/shop?cat=Chakra+Balancing" as const, label: t("chakra") },
    { href: "/shop?cat=Channeling" as const, label: t("channeling") },
    { href: "/shop?cat=Courses" as const, label: t("courses") },
    { href: "/shop?cat=Meditations" as const, label: t("meditations") },
    { href: "/shop?cat=Workshops" as const, label: t("workshops") },
  ];

  const infoLinks = [
    { href: "/privacy" as const, label: t("privacy") },
    { href: "/terms" as const, label: t("terms") },
    { href: "/disclaimer" as const, label: t("disclaimer") },
    { href: "/imprint" as const, label: t("imprint") },
  ];

  return (
    <footer className="bg-brand-cream-dark border-t border-brand-gold/20">
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo-dark.png"
              alt="HOLIU"
              width={80}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <p className="text-sm text-brand-warmgray leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Info links */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-brand-dark mb-4">
              {t("info")}
            </h4>
            <ul className="flex flex-col gap-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-warmgray hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-widest uppercase text-brand-dark mb-4">
              {t("shop")}
            </h4>
            <ul className="flex flex-col gap-2">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-warmgray hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-gold/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-warmgray/60">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-brand-warmgray/60">{t("madeWith")} ♥</p>
        </div>
      </div>
    </footer>
  );
}
