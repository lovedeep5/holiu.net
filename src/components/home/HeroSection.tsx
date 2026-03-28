"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#fdf8f2" }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg-2.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay: fully opaque cream on left, fades on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, #fdf8f2 0%, #fdf8f2 40%, rgba(253,248,242,0.88) 60%, rgba(253,248,242,0.2) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 w-full pt-28 pb-16 px-6"
        style={{ maxWidth: "1152px", margin: "0 auto" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* ── Left: Text ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
            {/* Pre-heading */}
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#a38d51",
                margin: 0,
              }}
            >
              Welcome to HOLIU
            </p>

            {/* Main heading */}
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  lineHeight: 1.1,
                  color: "#2c2520",
                  margin: 0,
                }}
              >
                Discover the{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span style={{ color: "#fc8855", fontStyle: "italic" }}>
                    TREASURE
                  </span>
                  <svg
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      width: "100%",
                    }}
                    viewBox="0 0 200 8"
                    fill="none"
                  >
                    <path
                      d="M1 5.5C40 2 80 1 100 1C120 1 160 2 199 5.5"
                      stroke="#fc8855"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                inside of you
              </h1>
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "#7a6f66",
                maxWidth: "480px",
                margin: 0,
              }}
            >
              Spiritual courses, meditations &amp; channeling sessions by Ruth
              Heinen — Channel Medium, Healer &amp; Spiritual Lifestyle Coach.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/shop" className="btn-primary">
                Start Today
              </Link>
              <Link href="/about" className="btn-outline">
                Learn More
              </Link>
            </div>

            {/* Trust */}
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.7rem",
                color: "rgba(122,111,102,0.55)",
                letterSpacing: "0.05em",
                margin: 0,
              }}
            >
              Trusted by hundreds of students worldwide
            </p>
          </div>

          {/* ── Right: Portrait — hidden on mobile ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="hidden md:flex"
            style={{ position: "relative", justifyContent: "center" }}
          >
            <div style={{ position: "relative", width: "380px", maxWidth: "100%" }}>
              {/* Arch background glow */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(252,136,85,0.18), rgba(163,141,81,0.15))",
                  borderRadius: "50% 50% 0 0 / 55% 55% 0 0",
                }}
              />
              <Image
                src="/images/ruth-portrait.jpg"
                alt="Ruth Heinen — Founder of HOLIU"
                width={380}
                height={510}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "50% 50% 0 0 / 40% 40% 0 0",
                }}
                priority
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "-2rem",
                background: "white",
                borderRadius: "1rem",
                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                padding: "0.875rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: "rgba(252,136,85,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                }}
              >
                ✨
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#2c2520",
                    margin: 0,
                  }}
                >
                  Spiritual Coach
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.7rem",
                    color: "rgba(122,111,102,0.7)",
                    margin: 0,
                  }}
                >
                  Ruth Heinen
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
