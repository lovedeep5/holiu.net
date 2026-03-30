"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sabine Wollert",
    avatar: "/images/testimonials/sabine-wollert.png",
    text: "You live a down-to-earth, everyday spirituality and you convey this very professionally in your workshops. Here all levels are linked so that the released energies and insights have a lasting effect and can be implemented.",
  },
  {
    name: "Nic Naa",
    avatar: "/images/testimonials/nic-naa.png",
    text: "For me, the meditations are very harmoniously coordinated and structured. I feel light and lively and empowered. The pleasant, clear and sensitive voice grounds me. The meditations leave me feeling very relaxed and full of zest for life.",
  },
  {
    name: "Anne Probst",
    avatar: "/images/testimonials/anne-probst.png",
    text: "Ruth takes you on a very special journey in her meditations. Full of clarity, sharpness and compassion, her announcements touch the deepest part of me and open the doors to the light. Thank you dear Ruth for your special gift.",
  },
  {
    name: "Jens Schack",
    avatar: "/images/testimonials/jens-schack.jpg",
    text: "Ruth loves people. Therefore she can carefully empathize with the needs of the participants in a group. I appreciate this deeply.",
  },
  {
    name: "Ursa",
    avatar: "/images/testimonials/ursa.jpg",
    text: "Your gentle but powerful guidance takes me on a journey within myself. I can open my heart. Your voice allows me to empty my thoughts and brings deep relaxation to me.",
  },
  {
    name: "Bernd Kienle",
    avatar: "/images/testimonials/bernd-kienle.png",
    text: "The meditations are a wonderful gift. Ruth has the ability to guide you gently but powerfully into your inner world. Each session leaves me refreshed and centered.",
  },
];

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
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "#fdf8f2" }}
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
            Testimonials
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "#2c2520",
          }}>
            WHAT OUR CLIENTS SAY
          </h2>
        </div>

        {/* Carousel */}
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          {/* Avatar */}
          <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 1.5rem",
            border: "3px solid rgba(163,141,81,0.3)",
            position: "relative",
          }}>
            <Image
              src={t.avatar}
              alt={t.name}
              fill
              className="object-cover"
              sizes="80px"
            />
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
