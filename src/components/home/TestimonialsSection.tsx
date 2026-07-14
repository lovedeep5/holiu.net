"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// Avatars stay in code (not translatable); names + quotes come from translations.
// null = no photo yet, falls back to an initials circle (see Avatar below).
const avatars: (string | null)[] = [null, null, null, null, null];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function Avatar({ name, src }: { name: string; src: string | null }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img key={name} src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />;
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fdf0ea",
        color: "#a38d51",
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: "1.5rem",
      }}
    >
      {initials(name)}
    </div>
  );
}

function Stars() {
  return (
    <div style={{ display: "flex", gap: "3px", marginBottom: "1rem" }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#fc8855">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const tl = useTranslations("home.testimonials");
  const [current, setCurrent] = useState(0);

  const items = tl.raw("items") as { name: string; text: string }[];
  const testimonials = items.map((it, i) => ({ ...it, avatar: avatars[i] }));

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container-max">
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#a38d51",
            marginBottom: "0.75rem",
          }}>
            {tl("eyebrow")}
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#2c2520",
          }}>
            {tl("heading")}
          </h2>
        </div>

        {/* Carousel */}
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          {/* Avatar — plain img + key forces reload on slide change */}
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 1.5rem",
            border: "3px solid rgba(163,141,81,0.3)",
          }}>
            <Avatar name={t.name} src={t.avatar} />
          </div>

          {/* Stars */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stars />
          </div>

          {/* Quote */}
          <blockquote style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#4a3f38",
            lineHeight: 1.8,
            fontStyle: "italic",
            margin: "0 0 1.5rem",
            minHeight: "120px",
          }}>
            &ldquo;{t.text}&rdquo;
          </blockquote>

          {/* Name */}
          <p style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#2c2520",
            letterSpacing: "0.05em",
            marginBottom: "2rem",
          }}>
            — {t.name}
          </p>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
            <button
              onClick={prev}
              aria-label="Previous"
              style={{
                width: "44px", height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(163,141,81,0.4)",
                background: "white",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem", color: "#a38d51",
              }}
            >
              ‹
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "8px" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    border: "none",
                    background: i === current ? "#fc8855" : "rgba(163,141,81,0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              style={{
                width: "44px", height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(163,141,81,0.4)",
                background: "white",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.1rem", color: "#a38d51",
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
