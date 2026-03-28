import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("courses") };
}

// Static course/workshop data until Supabase is connected
const courses = [
  {
    slug: "2x5-meditation-easy",
    name_en: "2X5 Meditation Easy – Your Magic Formula for Joy & Success",
    name_de: "2X5 Meditation Easy – Deine Zauberformel für Freude & Erfolg",
    category: "Courses",
    price: 9700,
    image: "/images/products/2x5-meditation-easy.png",
  },
  {
    slug: "create-life-you-want-en",
    name_en: "Create The Life You Want (EN)",
    name_de: "Erschaffe das Leben, das du willst (EN)",
    category: "Workshops",
    price: 2200,
    image: "/images/products/create-life-you-want.png",
  },
  {
    slug: "create-life-you-want-de",
    name_en: "Create The Life You Want (DE)",
    name_de: "Erschaffe das Leben, das du willst (DE)",
    category: "Workshops",
    price: 2200,
    image: "/images/products/create-life-you-want.png",
  },
  {
    slug: "create-new-identity-en",
    name_en: "Create Your New Identity (EN)",
    name_de: "Erschaffe deine neue Identität (EN)",
    category: "Workshops",
    price: 2200,
    image: "/images/products/create-new-identity.png",
  },
  {
    slug: "create-new-identity-de",
    name_en: "Create Your New Identity (DE)",
    name_de: "Erschaffe deine neue Identität (DE)",
    category: "Workshops",
    price: 2200,
    image: "/images/products/create-new-identity.png",
  },
  {
    slug: "create-perfect-love-life",
    name_en: "Create Your Perfect Love Life",
    name_de: "Erschaffe dein perfektes Liebesleben",
    category: "Workshops",
    price: 2200,
    image: "/images/products/create-perfect-love-life.png",
  },
  {
    slug: "find-your-flow-de",
    name_en: "Find Your Flow (DE)",
    name_de: "Finde deinen Flow (DE)",
    category: "Workshops",
    price: 2200,
    image: "/images/products/find-your-flow.png",
  },
  {
    slug: "heilung-familienkarmas",
    name_en: "Heilung deines Familien Karmas",
    name_de: "Heilung deines Familien Karmas",
    category: "Workshops",
    price: 2200,
    image: "/images/products/heilung-familienkarmas.png",
  },
];

function formatPrice(cents: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", minimumFractionDigits: 0 }).format(cents / 100);
}

export default function CoursesPage() {
  const t = useTranslations("coursesPage");
  const locale = useLocale();

  return (
    <>
      {/* Hero — full bleed angel wings photo (matching original site) */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/beach-2.jpg"
            alt="Courses & Workshops"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(44,37,32,0.52)" }}
          />
        </div>

        <div className="relative z-10 text-center container-max section-padding">
          <AnimateIn direction="none">
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1rem",
              }}
            >
              HOLIU
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "white",
                lineHeight: 1.15,
                maxWidth: "700px",
                margin: "0 auto 1.5rem",
              }}
            >
              {t("heroHeading")}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "1rem",
                color: "rgba(255,255,255,0.8)",
                maxWidth: "500px",
                margin: "0 auto 2rem",
                lineHeight: 1.7,
              }}
            >
              {t("subheading")}
            </p>
            <Link href="/shop" className="btn-primary">
              {t("allCourses")}
            </Link>
          </AnimateIn>
        </div>

        {/* Smooth bottom transition to white */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: "180px", background: "linear-gradient(to bottom, transparent, #ffffff)" }}
        />
      </section>

      {/* 2x5 Meditation Easy — Featured course section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
            className="md:grid-cols-2 grid-cols-1"
          >
            {/* Left: product image */}
            <AnimateIn>
              <div
                style={{
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  boxShadow: "0 30px 80px rgba(44,37,32,0.15)",
                  background: "linear-gradient(135deg, #fdf8f2 0%, #f5ede0 100%)",
                  padding: "2rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/images/products/2x5-meditation-easy-full.png"
                  alt="2X5 Meditation Easy"
                  width={460}
                  height={460}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </AnimateIn>

            {/* Right: copy */}
            <AnimateIn delay={0.12}>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#a38d51",
                  marginBottom: "0.75rem",
                }}
              >
                {t("featuredCourse")}
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                  color: "#2c2520",
                  lineHeight: 1.2,
                  marginBottom: "1.25rem",
                }}
              >
                {t("featuredTitle")}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "#7a6f66",
                  marginBottom: "1rem",
                }}
              >
                {t("featuredBody1")}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "#7a6f66",
                  marginBottom: "2rem",
                }}
              >
                {t("featuredBody2")}
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: "#fc8855",
                  }}
                >
                  €97
                </span>
                <Link href={"/shop/2x5-meditation-easy" as any} className="btn-primary">
                  {t("featuredBuy")}
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* All courses grid */}
      <section className="section-padding bg-white" style={{ paddingTop: 0 }}>
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, i) => {
              const name = locale === "de" ? course.name_de : course.name_en;
              return (
                <AnimateIn key={course.slug} delay={(i % 3) * 0.08}>
                  <Link href={`/shop/${course.slug}` as any} className="group block">
                    <div
                      className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-300"
                      style={{ border: "1px solid rgba(163,141,81,0.1)" }}
                    >
                      <div className="relative aspect-[450/340] bg-gradient-to-b from-brand-cream to-white overflow-hidden">
                        <Image
                          src={course.image}
                          alt={name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                          sizes="(max-width: 768px) 90vw, 360px"
                        />
                      </div>
                      <div className="p-5 border-t border-brand-gold/10">
                        <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-brand-gold">
                          {course.category}
                        </span>
                        <div className="flex items-start justify-between mt-1 gap-2">
                          <h3 className="font-display text-base text-brand-dark leading-tight">
                            {name}
                          </h3>
                          <span className="font-body text-sm font-bold text-brand-orange shrink-0">
                            {formatPrice(course.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              );
            })}
          </div>

          <AnimateIn delay={0.3} className="text-center mt-14">
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.9rem",
                color: "#7a6f66",
                marginBottom: "1.25rem",
              }}
            >
              Looking for meditations or channeling sessions?
            </p>
            <Link href="/shop" className="btn-primary">
              View Full Shop
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
