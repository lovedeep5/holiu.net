import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";

const featured = [
  {
    name: "2X5 Meditation Easy",
    category: "Course",
    price: "€97",
    image: "/images/products/2x5-meditation-easy.png",
    href: "/shop/2x5-meditation-easy",
  },
  {
    name: "Healing The Witch Wound",
    category: "Chakra Balancing",
    price: "€12",
    image: "/images/products/healing-witch-wound.png",
    href: "/shop/healing-witch-wound",
  },
  {
    name: "Create Your New Identity",
    category: "Workshop",
    price: "€22",
    image: "/images/products/create-new-identity.png",
    href: "/shop/create-new-identity-en",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="section-padding bg-brand-cream">
      <div className="container-max">
        <AnimateIn className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-brand-dark mb-4">
            Visit Our Shop
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product, i) => (
            <AnimateIn key={product.name} delay={i * 0.12}>
              <Link href={product.href} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-shadow duration-400">
                  {/* Product arch image */}
                  <div className="relative aspect-[450/685] bg-gradient-to-b from-brand-cream to-white">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 90vw, 360px"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 border-t border-brand-gold/10">
                    <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-brand-gold">
                      {product.category}
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <h3 className="font-display text-lg text-brand-dark leading-tight">
                        {product.name}
                      </h3>
                      <span className="font-body text-base font-bold text-brand-orange shrink-0 ml-3">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.4} className="text-center mt-12">
          <Link href="/shop" className="btn-primary">
            Visit Shop
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
