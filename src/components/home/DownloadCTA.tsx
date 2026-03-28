import AnimateIn from "@/components/ui/AnimateIn";

export default function DownloadCTA() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ backgroundColor: "#fc8855" }}>
      {/* Background decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="container-max relative">
        <AnimateIn direction="none" className="text-center flex flex-col gap-6 items-center">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-white/70">
            Free Gift
          </p>

          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight max-w-2xl">
            Start Your Journey{" "}
            <span className="italic">Today</span>
          </h2>

          <p className="font-body text-base text-white/80 max-w-xl leading-relaxed">
            Download your free introductory meditation and take your very first step towards
            discovering the treasure inside of you. It only takes a spark.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="/meditation"
              className="inline-flex items-center justify-center gap-2
                         bg-white text-brand-orange
                         px-8 py-3.5 rounded-full
                         font-body font-semibold text-sm tracking-widest uppercase
                         hover:bg-brand-cream transition-all duration-300
                         shadow-xl shadow-black/10"
            >
              Download Now — Free
            </a>
            <a
              href="/courses"
              className="inline-flex items-center justify-center gap-2
                         border-2 border-white/50 text-white
                         px-8 py-3.5 rounded-full
                         font-body font-semibold text-sm tracking-widest uppercase
                         hover:bg-white/10 transition-all duration-300"
            >
              Explore Courses
            </a>
          </div>

          <p className="font-body text-xs text-white/50 mt-2">
            No credit card required &bull; Instant download
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
