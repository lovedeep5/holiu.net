export default function MeditationQuote() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Large decorative quote mark — left-aligned */}
      <div
        className="absolute top-6 left-8"
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "8rem",
          lineHeight: 1,
          color: "#e8d5c0",
          userSelect: "none",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="container-max relative">
        <blockquote
          className="max-w-3xl mx-auto text-center"
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
            fontWeight: 600,
            lineHeight: 1.9,
            color: "#c9a84c",
            letterSpacing: "0.02em",
          }}
        >
          Meditation is a process of lightening up, of trusting the basic goodness of what we
          have and who we are, and of realizing that any wisdom that exists, lives in what we
          already have. We can lead our life so as to become more awake to who we are and what
          we&apos;re doing rather than trying to improve or change or get rid of who we are or
          what we&apos;re doing. The key is to wake up, to become more alert, more inquisitive
          and curious about our true selves.
        </blockquote>
      </div>
    </section>
  );
}
