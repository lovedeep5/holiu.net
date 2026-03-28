import AnimateIn from "@/components/ui/AnimateIn";

export default function MeditationQuote() {
  return (
    <section className="section-padding bg-brand-cream-dark relative overflow-hidden">
      {/* Decorative large quote mark */}
      <div
        className="absolute top-8 left-8 font-display text-[200px] leading-none text-brand-orange/5 select-none pointer-events-none"
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <div className="container-max relative">
        <AnimateIn direction="none">
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
            {/* Ornament */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-brand-gold/40" />
              <span className="text-brand-gold text-lg">✦</span>
              <div className="h-px w-16 bg-brand-gold/40" />
            </div>

            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl text-brand-dark leading-relaxed italic">
              &ldquo;Meditation is a process of lightening up, of trusting the basic goodness
              of what we have and who we are, and of realizing that any wisdom that exists,
              lives in what we already have.&rdquo;
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-brand-gold/40" />
              <span className="text-brand-gold text-lg">✦</span>
              <div className="h-px w-16 bg-brand-gold/40" />
            </div>

            <div className="flex flex-col gap-6 items-center">
              <p className="font-body text-sm text-brand-warmgray leading-relaxed max-w-xl">
                Do you want more from life? Discover the treasure within you.
              </p>
              <a
                href="/meditation"
                className="btn-primary"
              >
                Download Free Meditation
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
