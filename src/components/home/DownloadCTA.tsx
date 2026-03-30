import { Link } from "@/i18n/navigation";
import WaveDivider from "@/components/ui/WaveDivider";

export default function DownloadCTA() {
  return (
    <>
      <section
        className="section-padding relative overflow-hidden"
        style={{ backgroundColor: "#fce4dc" }}
      >
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left: text */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#2c2520",
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                  fontWeight: 700,
                }}
              >
                Do You Want More From Life?
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.95rem",
                  color: "#5a4f46",
                  marginBottom: "2rem",
                  letterSpacing: "0.05em",
                }}
              >
                Discover the treasure within you!
              </p>

              <Link href="/meditation" className="btn-primary">
                Download NOW
              </Link>
            </div>

            {/* Right: chakra image */}
            <div className="flex justify-center">
              <img
                src="/images/chakra-meditation.png"
                alt="Chakra Meditation"
                style={{ maxWidth: "320px", width: "100%", opacity: 0.9 }}
              />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#ffffff" background="#fce4dc" variant="curve" />
    </>
  );
}
