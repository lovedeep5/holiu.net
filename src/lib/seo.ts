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

/**
 * Builds a self-referencing canonical + hreflang alternates block for a
 * given locale and locale-relative path (e.g. "/about", "/shop/foo", or
 * "/" for the homepage). Paths are combined with `metadataBase` (set in
 * the root [locale] layout), so these can stay relative.
 */
export function buildAlternates(locale: string, path: string) {
  const clean = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `/${l}${clean}`;
  }
  languages["x-default"] = `/${routing.defaultLocale}${clean}`;

  return {
    canonical: `/${locale}${clean}`,
    languages,
  };
}
