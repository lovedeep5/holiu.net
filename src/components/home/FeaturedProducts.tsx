import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const featured = [
  {
    name: "2X5 Meditation Easy",
    headline: "Learn a Fast, Powerful Meditation Method Even on Your Busiest Days.",
    category: "Course",
    price: "€197",
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

export default async function FeaturedProducts() {
  const t = await getTranslations("home.shop");
  return (
    <section className="section-padding bg-brand-cream">
      <div className="container-max">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl text-brand-dark mb-4">
            {t("heading")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((product) => (
            <div key={product.name}>
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
                    {"headline" in product && (
                      <p className="font-body text-xs text-brand-dark/60 mt-2 leading-snug">
                        {product.headline}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="btn-primary">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
