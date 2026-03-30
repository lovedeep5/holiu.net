import Image from "next/image";

export default function HeroSection() {

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Full-bleed beach background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg-2.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Subtle warm overlay so dark text stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(253,248,242,0.42)" }}
        />
      </div>

      {/* Centered logo */}
      <div
        className="relative z-10 flex flex-col items-center px-6"
        style={{ gap: "0.75rem" }}
      >
        {/* HOLIU Logo mark */}
        <Image
          src="/images/logo-dark.png"
          alt="HOLIU"
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
          priority
        />

        {/* HOLISTIC LIFESTYLE UNIVERSE tagline */}
        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#2c2520",
            margin: 0,
          }}
        >
          HOLISTIC LIFESTYLE UNIVERSE
        </p>
      </div>
    </section>
  );
}
