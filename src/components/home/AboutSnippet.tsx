import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

export default function AboutSnippet() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimateIn direction="right">
            <div className="relative">
              <div className="aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-3xl">
                <Image
                  src="/images/ruth-beach.jpg"
                  alt="Ruth Heinen"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, 400px"
                />
              </div>
              {/* Gold accent card */}
              <div className="absolute -bottom-6 -right-4 bg-brand-cream border border-brand-gold/30 rounded-2xl px-6 py-4 shadow-lg">
                <p className="font-display text-2xl text-brand-gold">10+</p>
                <p className="font-body text-xs text-brand-warmgray tracking-wide">Years of Experience</p>
              </div>
            </div>
          </AnimateIn>

          {/* Text */}
          <div className="flex flex-col gap-6">
            <AnimateIn delay={0.1}>
              <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-gold">
                About Ruth
              </p>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-brand-dark">
                My Path to{" "}
                <span className="italic text-brand-orange">Meditation</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={0.3}>
              <p className="font-body text-base text-brand-warmgray leading-relaxed">
                As a fashion designer, it has always been my greatest wish to help women
                express themselves, discover their true beauty and make it shine.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.4}>
              <p className="font-body text-base text-brand-warmgray leading-relaxed">
                In my greatest crisis, I discovered meditation. It has helped me get into
                the moment — to experience the present and know that only the Here and Now
                counts. The greatest gift I received through meditation is the connection to
                everything that is, and the great peace that arises as a result.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.5}>
              <div className="flex items-end gap-4 pt-2">
                <Image
                  src="/images/ruth-signature.png"
                  alt="Ruth signature"
                  width={140}
                  height={60}
                  className="object-contain"
                />
                <div>
                  <p className="font-body text-sm font-semibold text-brand-dark">Ruth Heinen</p>
                  <p className="font-body text-xs text-brand-warmgray">Founder & CEO, HOLIU</p>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.6}>
              <Link href="/about" className="btn-outline self-start mt-2">
                Read My Story
              </Link>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
