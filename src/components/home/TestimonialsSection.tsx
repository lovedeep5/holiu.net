import Image from "next/image";
import AnimateIn from "@/components/ui/AnimateIn";

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

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 fill-brand-orange" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Heading */}
        <AnimateIn className="text-center mb-16">
          <p className="font-body text-xs font-semibold tracking-[0.3em] uppercase text-brand-gold mb-3">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-brand-dark">
            What Our Students Say
          </h2>
        </AnimateIn>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.name} delay={i * 0.08}>
              <div className="bg-brand-cream rounded-2xl p-6 flex flex-col gap-4 h-full border border-brand-gold/10 hover:border-brand-gold/30 hover:shadow-md transition-all duration-300">
                <StarRating />
                <p className="font-body text-sm text-brand-warmgray leading-relaxed flex-1 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-brand-gold/10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 bg-brand-cream-dark">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <p className="font-body text-sm font-semibold text-brand-dark">
                    {t.name}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
