import { routing } from "@/i18n/routing";

/**
 * Next.js does NOT deep-merge `openGraph`/`twitter` objects across route
 * segments — whichever segment declares its own `openGraph` key replaces
 * the whole resolved object, including any `images` the root
 * opengraph-image.jpg file convention injected. Any metadata export that
 * sets `openGraph` or `twitter` must re-include this image explicitly.
 */
export const OG_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "HOLIU — Discover the Treasure Inside of You",
};

const SITE_URL = "https://www.holiu.net";

/**
 * Builds a self-referencing canonical for a given locale and
 * locale-relative path (e.g. "/about", "/shop/foo", or "/" for the
 * homepage). Paths are combined with `metadataBase` (set in the root
 * [locale] layout), so these can stay relative.
 *
 * hreflang alternates are intentionally NOT set here — Next.js's
 * `alternates.languages` metadata field renders as `hrefLang` (capital L)
 * in the raw HTML. Real browsers/crawlers parse HTML attributes
 * case-insensitively so this is spec-compliant, but naive third-party SEO
 * checkers doing literal string matching flag it as invalid. Use
 * <HreflangLinks> (src/components/seo/HreflangLinks.tsx) instead, which
 * hand-renders lowercase tags via React 19's built-in <link> hoisting.
 */
export function buildAlternates(locale: string, path: string) {
  const clean = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${clean}`,
  };
}

/** Absolute hreflang alternate URLs (including x-default) for a given locale-relative path. */
export function hreflangEntries(path: string): { hreflang: string; href: string }[] {
  const clean = path === "/" ? "" : path;
  return [
    ...routing.locales.map((l) => ({ hreflang: l, href: `${SITE_URL}/${l}${clean}` })),
    { hreflang: "x-default", href: `${SITE_URL}/${routing.defaultLocale}${clean}` },
  ];
}
