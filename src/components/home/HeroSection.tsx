import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Full-bleed beach background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg-2.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(253,248,242,0.35)" }} />
      </div>

      {/* Centered logo — pushed below fixed navbar (80px) */}
      <div
        className="relative z-10 flex flex-col items-center px-6"
        style={{ gap: "1rem", paddingTop: "80px" }}
      >
        <Image
          src="/images/logo-dark-opt.png"
          alt="HOLIU"
          width={400}
          height={400}
          sizes="(max-width: 768px) 88vw, 400px"
          style={{
            width: "min(88vw, 78vh)",
            height: "auto",
            objectFit: "contain",
          }}
        />

      </div>
    </section>
  );
}
