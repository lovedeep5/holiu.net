import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getProducts } from "@/lib/products";

const BASE_URL = "https://www.holiu.net";

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/courses", changeFrequency: "weekly", priority: 0.9 },
  { path: "/meditation", changeFrequency: "monthly", priority: 0.7 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/get-started", changeFrequency: "monthly", priority: 0.6 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/imprint", changeFrequency: "yearly", priority: 0.2 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.2 },
];

function localeUrls(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${BASE_URL}/${locale}${path === "/" ? "" : path}`;
  }
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    const languages = localeUrls(route.path);
    for (const locale of routing.locales) {
      entries.push({
        url: languages[locale],
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      });
    }
  }

  const products = await getProducts();
  for (const product of products) {
    const path = `/shop/${product.slug}`;
    const languages = localeUrls(path);
    for (const locale of routing.locales) {
      entries.push({
        url: languages[locale],
        lastModified: product.created_at ? new Date(product.created_at) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
