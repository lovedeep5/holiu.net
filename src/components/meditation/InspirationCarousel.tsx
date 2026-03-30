"use client";

import { useState, useEffect } from "react";

const slides = [
  { src: "/images/med-06.jpg", alt: "Breathe" },
  { src: "/images/med-04.jpg", alt: "Meditation" },
  { src: "/images/med-02.jpg", alt: "Reflection" },
  { src: "/images/med-07.jpg", alt: "Lotus" },
  { src: "/images/med-03.jpg", alt: "Practice" },
];

export default function InspirationCarousel() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const count = isMobile ? 1 : 3;
  const imgSize = isMobile ? 260 : 200;

  const visible = Array.from({ length: count }, (_, i) =>
    slides[(current + i) % slides.length]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
      {/* Images + arrows row */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            background: "none",
            border: "1px solid #d4c9b8",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a38d51",
            fontSize: "1rem",
            flexShrink: 0,
            transition: "border-color 0.2s",
          }}
        >
          ‹
        </button>

        {/* images */}
        <div style={{ display: "flex", gap: "1rem" }}>
          {visible.map((slide, i) => (
            <div
              key={`${current}-${i}`}
              style={{
                width: `${imgSize}px`,
                height: `${imgSize}px`,
                overflow: "hidden",
                flexShrink: 0,
                borderRadius: "2px",
              }}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Next"
          style={{
            background: "none",
            border: "1px solid #d4c9b8",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a38d51",
            fontSize: "1rem",
            flexShrink: 0,
            transition: "border-color 0.2s",
          }}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        {slides.map((_, i) => (
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
    </div>
  );
}
