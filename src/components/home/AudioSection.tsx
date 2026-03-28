"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AudioSection() {
  const t = useTranslations("hero");

  return (
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
          {/* Left: audio player card */}
          <div
            style={{
              background: "white",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 24px 64px rgba(44,37,32,0.10)",
              border: "1px solid rgba(163,141,81,0.12)",
            }}
          >
            {/* Top band */}
            <div
              style={{
                background: "linear-gradient(135deg, #2c2520 0%, #4a3f38 100%)",
                padding: "2rem 2rem 1.5rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(163,141,81,0.9)",
                  marginBottom: "0.6rem",
                }}
              >
                Free Gift
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.6rem",
                  color: "white",
                  marginBottom: "0.25rem",
                  lineHeight: 1.2,
                }}
              >
                Chakra Meditation
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Guided by Ruth Heinen
              </p>

              {/* Waveform bars */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                  margin: "1.25rem 0 0",
                  height: "32px",
                }}
              >
                {[14, 22, 18, 28, 24, 32, 20, 26, 16, 30, 22, 18, 28, 14, 20].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: "3px",
                      height: `${h}px`,
                      borderRadius: "2px",
                      background: i < 6 ? "#fc8855" : "rgba(255,255,255,0.25)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Player area */}
            <div style={{ padding: "1.5rem 2rem 2rem" }}>
              <audio
                controls
                style={{
                  width: "100%",
                  height: "36px",
                  marginBottom: "1.25rem",
                  accentColor: "#fc8855",
                }}
                src="https://dev.holiu.net/wp-content/uploads/2025/05/Chakra-Meditation-1.mp3"
              >
                Your browser does not support the audio element.
              </audio>

              <a
                href="https://dev.holiu.net/wp-content/uploads/2025/05/Chakra-Meditation-1.mp3"
                download="Holiu-Chakra-Meditation.mp3"
                className="btn-primary"
                style={{ display: "flex", justifyContent: "center", fontSize: "0.8rem" }}
              >
                Download Now — Free
              </a>
            </div>
          </div>

          {/* Right: text content */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#a38d51",
                marginBottom: "1rem",
              }}
            >
              HOLIU
            </p>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#2c2520",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Hi,{" "}
              <span style={{ fontStyle: "italic", color: "#fc8855" }}>
                Do you want more from life?
              </span>
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
              Do you feel that there is a treasure deep inside you? Then you are at the right place!
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1rem",
              }}
            >
              Holiu offers you the opportunity to reach a higher level in all areas of your life — enabling you to find more joy, serenity and peace within yourself and to be more fulfilled.
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "1rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1.5rem",
              }}
            >
              Do you feel inspired to take your life to a new level? Would you like to know more about your life's purpose and live your true essence? Then don't wait any longer — you have almost reached your goal. Start today and discover the treasure within you.
            </p>

            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "1.05rem",
                color: "#2c2520",
                marginBottom: "2rem",
                fontStyle: "italic",
              }}
            >
              I'm really looking forward to welcoming you!
              <br />
              <span style={{ color: "#fc8855" }}>Love, Ruth ❤</span>
            </p>

            <Link href="/about" className="btn-outline">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
