import { hreflangEntries } from "@/lib/seo";

/**
 * Hand-rendered lowercase hreflang <link> tags — see the comment on
 * buildAlternates() in src/lib/seo.ts for why these aren't set via the
 * `alternates.languages` metadata field. React 19 hoists <link> elements
 * rendered anywhere in the tree into <head> automatically.
 */
export default function HreflangLinks({ path }: { path: string }) {
  return (
    <>
      {hreflangEntries(path).map((entry) => {
        // TypeScript's JSX types only know the camelCase `hrefLang` DOM
        // property alias; spread an untyped object so the literal
        // lowercase `hreflang` attribute name we actually want reaches
        // the DOM unchanged instead of being coerced back to hrefLang.
        const linkProps: Record<string, string> = {
          rel: "alternate",
          hreflang: entry.hreflang,
          href: entry.href,
        };
        return <link key={entry.hreflang} {...linkProps} />;
      })}
    </>
  );
}
