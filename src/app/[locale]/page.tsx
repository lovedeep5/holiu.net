import HeroSection from "@/components/home/HeroSection";
import TreasureSection from "@/components/home/TreasureSection";
import AboutRuthSection from "@/components/home/AboutRuthSection";
import MeditationQuote from "@/components/home/MeditationQuote";
import DownloadCTA from "@/components/home/DownloadCTA";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ContactSection from "@/components/home/ContactSection";
import WaveDivider from "@/components/ui/WaveDivider";

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <HeroSection />

      {/* 2 — TREASURE */}
      <TreasureSection />

      {/* 3 — About Ruth (gradient peach) */}
      <AboutRuthSection />

      {/* Wave — matches gradient end exactly (#fdc8b1), white fill for MeditationQuote */}
      <div style={{ marginTop: "-2px" }}>
        <WaveDivider fill="#ffffff" background="#fdc8b1" variant="wave" />
      </div>

      {/* 4 — Meditation quote (white) */}
      <MeditationQuote />

      {/* Wave — white → peach (curve flip into DownloadCTA) */}
      <WaveDivider fill="#fce4dc" background="#ffffff" variant="curve" flip />

      {/* 5 — Do You Want More From Life? */}
      <DownloadCTA />

      {/* Wave — peach → white (merges into Testimonials) */}
      <WaveDivider fill="#ffffff" background="#fce4dc" variant="wave" />

      {/* 6 — Testimonials (white) */}
      <TestimonialsSection />

      {/* 7 — Featured Products (cream, no wave — straight cut) */}
      <FeaturedProducts />

      {/* 8 — Contact form */}
      <ContactSection />
    </>
  );
}
