import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function AudioSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: Ruth's portrait */}
          <div className="flex justify-center md:justify-end">
            <div
              style={{
                position: "relative",
                width: "min(100%, 420px)",
                aspectRatio: "4 / 5",
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/ruth-portrait.jpg"
                alt="Ruth Heinen"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 420px"
              />
            </div>
          </div>

          {/* Right: text content */}
          <div>
            <h2
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                color: "#2c2520",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
                fontWeight: 400,
              }}
            >
              Hi,
            </h2>

            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1rem",
              }}
            >
              Do you want more from life? Do you feel that there is a treasure deep inside you?
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1rem",
              }}
            >
              Then you are at the right place!
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1rem",
              }}
            >
              Discover your hidden potential!
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1rem",
              }}
            >
              Holiu offers you the opportunity to reach a higher level in all areas of your life
              enabling you to find more joy, serenity and peace within yourself and to be more fulfilled.
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1rem",
              }}
            >
              Do you feel inspired to take your life to a new level?
              Would you like to know more about your life&apos;s purpose and live your true essence?
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1rem",
              }}
            >
              Then don&apos;t wait any longer, you have almost reached your goal – start today
              and discover the treasure within you ❣
            </p>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.85,
                color: "#7a6f66",
                marginBottom: "1.75rem",
              }}
            >
              I&apos;m really looking forward to welcome you!
              <br />
              Love,
              <br />
              Ruth ❤
            </p>

            <Link href="/about" className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
