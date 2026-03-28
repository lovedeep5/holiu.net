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
              background: "linear-gradient(135deg, #fdf8f2 0%, #f5ede0 100%)",
              borderRadius: "2rem",
              padding: "2.5rem",
              boxShadow: "0 20px 60px rgba(163,141,81,0.12)",
              border: "1px solid rgba(163,141,81,0.15)",
              textAlign: "center",
            }}
          >
            {/* Decorative ring */}
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "rgba(252,136,85,0.12)",
                border: "2px solid rgba(252,136,85,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
                fontSize: "2.25rem",
              }}
            >
              🎵
            </div>

            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#a38d51",
                marginBottom: "0.5rem",
              }}
            >
              Free Gift
            </p>
            <h3
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "1.5rem",
                color: "#2c2520",
                marginBottom: "0.5rem",
              }}
            >
              Chakra Meditation
            </h3>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.8rem",
                color: "#7a6f66",
                marginBottom: "1.5rem",
              }}
            >
              Guided by Ruth Heinen
            </p>

            <audio
              controls
              style={{
                width: "100%",
                borderRadius: "9999px",
                marginBottom: "1.5rem",
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
              style={{ display: "inline-flex", fontSize: "0.8rem" }}
            >
              Download Now — Free
            </a>
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
