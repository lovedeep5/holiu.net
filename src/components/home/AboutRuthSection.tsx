import Image from "next/image";
import { Link } from "@/i18n/navigation";
import AnimateIn from "@/components/ui/AnimateIn";
import WaveDivider from "@/components/ui/WaveDivider";

export default function AboutRuthSection() {
  return (
    <>
      <section
        className="section-padding relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #fc8855 0%, #f5a977 30%, #fde4d0 65%, #fdf8f2 100%)",
        }}
      >
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* LEFT — Ruth photo in arch shape */}
            <AnimateIn direction="right">
              <div
                className="relative mx-auto lg:mx-0"
                style={{ maxWidth: "400px" }}
              >
                {/* Arch-shaped image */}
                <div
                  style={{
                    borderRadius: "50% 50% 12px 12px / 45% 45% 12px 12px",
                    overflow: "hidden",
                    aspectRatio: "3/4",
                    boxShadow: "0 40px 80px rgba(44,37,32,0.2)",
                  }}
                >
                  <Image
                    src="/images/ruth-portrait.jpg"
                    alt="Ruth Heinen — Founder of HOLIU"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 80vw, 400px"
                  />
                </div>

                {/* Name badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "white",
                    borderRadius: "1rem",
                    padding: "0.75rem 1.5rem",
                    boxShadow: "0 12px 32px rgba(44,37,32,0.15)",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <p style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "1rem", color: "#2c2520", fontWeight: 700, margin: 0 }}>Ruth Heinen</p>
                  <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.65rem", color: "#a38d51", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Founder & CEO · HOLIU</p>
                </div>
              </div>
            </AnimateIn>

            {/* RIGHT — text + CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", paddingTop: "1rem" }}>
              <AnimateIn delay={0.1}>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(44,37,32,0.5)", margin: 0 }}>
                  About Ruth
                </p>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2c2520", lineHeight: 1.2, margin: 0 }}>
                  Channel Medium,{" "}
                  <span style={{ fontStyle: "italic" }}>Healer &</span>
                  <br />Spiritual Coach
                </h2>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "#4a3f38", margin: 0 }}>
                  As a fashion designer, it has always been my greatest wish to help women express themselves, discover their true beauty and make it shine.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.35}>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "#4a3f38", margin: 0 }}>
                  In my greatest crisis, I discovered meditation. It helped me get into the moment — to experience the present and know that only the Here and Now counts. The greatest gift I received through meditation is the connection to everything that is, and the great peace that arises as a result.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.4}>
                <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "0.95rem", lineHeight: 1.85, color: "#4a3f38", margin: 0 }}>
                  Meditation lets us feel that the true essence of our being is pure happiness — and my mission is to share that with as many people as possible.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.45}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "0.5rem" }}>
                  <Image
                    src="/images/ruth-signature.png"
                    alt="Ruth's signature"
                    width={120}
                    height={50}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </AnimateIn>

              <AnimateIn delay={0.5}>
                <Link href="/about" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Learn More
                </Link>
              </AnimateIn>
            </div>

          </div>
        </div>
      </section>

      {/* Wave into next section */}
      <WaveDivider fill="#ffffff" background="#fdf8f2" variant="wave" />
    </>
  );
}
