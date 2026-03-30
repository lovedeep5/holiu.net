import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import WaveDivider from "@/components/ui/WaveDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("courses") };
}

export default async function CoursesPage() {
  const t = await getTranslations("coursesPage");

  return (
    <>
      {/* Hero — Buddha stone hands with flowers, full viewport, no text */}
      <section style={{ position: "relative", height: "100vh", minHeight: "560px" }}>
        <Image
          src="/images/backgrounds/course-hero-bg.jpg"
          alt="Courses & Workshops"
          fill
          className="object-cover"
          style={{ objectPosition: "center center" }}
          priority
        />
      </section>

      {/* Section: "Change Your Life..." — peach bg */}
      <section style={{ backgroundColor: "#fdf0ea", padding: "4rem 1.5rem 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)",
              color: "#a38d51",
              fontWeight: 400,
              fontStyle: "italic",
              marginBottom: "1.25rem",
            }}
          >
            {t("heroHeading")}
          </h1>
          {/* Orange underline */}
          <div style={{ width: "48px", height: "3px", background: "#fc8855", margin: "0 auto" }} />
        </div>

        {/* Wave: peach → white */}
        <div style={{ marginTop: "3rem" }}>
          <WaveDivider fill="#ffffff" background="#fdf0ea" variant="wave" />
        </div>
      </section>

      {/* Section: Featured course card — white bg, centered */}
      <section style={{ backgroundColor: "#ffffff", padding: "3rem 1.5rem 6rem" }}>
        <div style={{ maxWidth: "360px", margin: "0 auto", textAlign: "center" }}>
          {/* Course image card */}
          <div
            style={{
              borderRadius: "0.5rem",
              overflow: "hidden",
              marginBottom: "1.75rem",
              position: "relative",
              aspectRatio: "3/4",
            }}
          >
            <Image
              src="/images/backgrounds/courses-hero.jpg"
              alt={t("featuredTitle")}
              fill
              className="object-cover"
              sizes="360px"
            />
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#2c2520",
              fontWeight: 400,
              marginBottom: "0.5rem",
              lineHeight: 1.4,
            }}
          >
            {t("featuredTitle")}
          </h2>

          {/* Coming Soon label */}
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "0.75rem",
              color: "#9e9289",
              marginBottom: "1.5rem",
              letterSpacing: "0.05em",
            }}
          >
            {t("comingSoon")}
          </p>

          {/* CTA button */}
          <Link href={"/shop/2x5-meditation-easy" as any} className="btn-primary">
            {t("viewCourse")}
          </Link>
        </div>
      </section>
    </>
  );
}
