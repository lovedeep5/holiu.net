"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Pages with dark full-bleed hero images — need white logo/text when transparent
  const darkHeroRoutes = ["/about", "/meditation", "/courses"];
  const isDark = !scrolled && darkHeroRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"));

  const navLinks = [
    { href: "/about" as const, label: t("about") },
    { href: "/courses" as const, label: t("courses") },
    { href: "/meditation" as const, label: t("meditation") },
    { href: "/shop" as const, label: t("shop") },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function switchLocale(next: "en" | "de") {
    router.replace(pathname, { locale: next });
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_1px_0_rgba(163,141,81,0.12)]"
          : "bg-transparent"
      }`}
    >
      {/* Frosted pill wrapper — always visible */}
      <div className="container-max px-4 md:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo-dark.png"
              alt="HOLIU"
              width={72}
              height={36}
              className="h-9 w-auto object-contain transition-all duration-300"
              style={{
                filter: isDark ? "drop-shadow(0 1px 3px rgba(0,0,0,0.3)) brightness(0) invert(1)" : "none",
              }}
              priority
            />
          </Link>

          {/* Desktop nav — pill style */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                  isActive(link.href)
                    ? isDark
                      ? "bg-white/20 text-white"
                      : "bg-brand-orange/10 text-brand-orange"
                    : isDark
                    ? "text-white/85 hover:text-white hover:bg-white/15"
                    : "text-brand-warmgray hover:text-brand-dark hover:bg-brand-gold/8"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: locale switcher + CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Locale switcher pill */}
            <div
              className={`flex items-center rounded-full p-0.5 text-xs font-semibold tracking-wider transition-all duration-200 ${
                isDark ? "bg-white/15" : "bg-brand-gold/10"
              }`}
            >
              {(["en", "de"] as const).map((lng, i) => (
                <button
                  key={lng}
                  onClick={() => switchLocale(lng)}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    locale === lng
                      ? "bg-brand-orange text-white shadow-sm"
                      : isDark
                      ? "text-white/70 hover:text-white"
                      : "text-brand-warmgray hover:text-brand-dark"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Shop CTA */}
            <Link
              href="/shop"
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                isDark
                  ? "bg-white text-brand-orange hover:bg-white/90"
                  : "bg-brand-orange text-white hover:bg-brand-orange/90 shadow-sm"
              }`}
            >
              {t("shop")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 rounded-full transition-all duration-200 ${
              isDark ? "text-white" : "text-brand-dark"
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-brand-gold/10"
          >
            <div className="container-max px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold tracking-widest uppercase transition-colors ${
                    isActive(link.href)
                      ? "bg-brand-orange/10 text-brand-orange"
                      : "text-brand-warmgray hover:text-brand-dark hover:bg-brand-gold/8"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-3 pt-4 mt-2 border-t border-brand-gold/15">
                <div className="flex items-center gap-1">
                  {(["en", "de"] as const).map((lng) => (
                    <button
                      key={lng}
                      onClick={() => { switchLocale(lng); setOpen(false); }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all ${
                        locale === lng
                          ? "bg-brand-orange text-white"
                          : "text-brand-warmgray border border-brand-gold/20 hover:border-brand-gold/50"
                      }`}
                    >
                      {lng.toUpperCase()}
                    </button>
                  ))}
                </div>
                <Link
                  href="/shop"
                  onClick={() => setOpen(false)}
                  className="flex-1 btn-primary text-center text-xs py-2.5"
                >
                  {t("shop")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
