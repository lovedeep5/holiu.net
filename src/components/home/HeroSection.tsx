import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[120vh] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Full-bleed beach background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg-3.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Centered logo */}
      <div
        className="relative z-10 flex flex-col items-center px-6"
        style={{ gap: "1rem" }}
      >
        <h1 className="sr-only">HOLIU — Discover the Treasure Inside of You</h1>
        <Image
          src="/images/logo-dark.png"
          alt="HOLIU"
          width={900}
          height={900}
          quality={90}
          priority
          sizes="(max-width: 768px) 92vw, 820px"
          style={{
            width: "min(46vw, 47.5vh)",
            height: "auto",
            objectFit: "contain",
          }}
        />

      </div>
    </section>
  );
}
