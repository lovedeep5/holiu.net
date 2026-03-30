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
      {/* 1 — Hero: sea background + HOLIU logo */}
      <HeroSection />

      {/* 2 — DISCOVER THE / TREASURE / inside of you + CTA + audio */}
      <WaveDivider fill="#ffffff" background="#fdf8f2" variant="curve" />
      <TreasureSection />

      {/* 3 — Brand gradient + Ruth photo left + bio text right + wave */}
      <WaveDivider fill="#fc8855" background="#ffffff" variant="wave" />
      <AboutRuthSection />

      {/* 4 — Quote */}
      <MeditationQuote />

      {/* 5 — Download CTA + wave */}
      <WaveDivider fill="#fce4dc" background="#ffffff" variant="curve" flip />
      <DownloadCTA />

      {/* 6 — Testimonials carousel */}
      <TestimonialsSection />

      {/* 7 — Visit Our Shop: 3 products + Visit Shop CTA */}
      <WaveDivider fill="#fdf8f2" background="#fdf8f2" variant="tilt" />
      <FeaturedProducts />

      {/* 8 — Contact form with dark background image */}
      <WaveDivider fill="#2c2520" background="#fdf8f2" variant="wave" />
      <ContactSection />
    </>
  );
}
