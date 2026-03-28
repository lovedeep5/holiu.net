import HeroSection from "@/components/home/HeroSection";
import AudioSection from "@/components/home/AudioSection";
import MeditationQuote from "@/components/home/MeditationQuote";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import DownloadCTA from "@/components/home/DownloadCTA";
import WaveDivider from "@/components/ui/WaveDivider";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Hero → Audio/Hi section (cream → white) */}
      <WaveDivider fill="#ffffff" background="#fdf8f2" variant="curve" />
      <AudioSection />

      {/* Audio → Quote (white → cream-dark) */}
      <WaveDivider fill="#f5ede0" background="#ffffff" variant="wave" />
      <MeditationQuote />

      {/* Quote → Products (cream-dark → cream) */}
      <WaveDivider fill="#fdf8f2" background="#f5ede0" variant="curve" flip />
      <FeaturedProducts />

      {/* Products → Testimonials (cream → white) */}
      <WaveDivider fill="#ffffff" background="#fdf8f2" variant="tilt" />
      <TestimonialsSection />

      {/* Testimonials → CTA (white → orange) */}
      <WaveDivider fill="#fc8855" background="#ffffff" variant="wave" />
      <DownloadCTA />
    </>
  );
}
