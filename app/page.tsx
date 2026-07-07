// src/app/page.tsx
import HeroSection from '@/components/sections/HeroSection';
import FeatureSection from '@/components/sections/FeatureSection';
import ClassListing from '@/components/sections/ClassListing';
import FeatureCards from '@/components/sections/FeatureCards';
import Testimonials from '@/components/sections/Testimonials';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <main style={{ paddingTop: '70px' }}>
      {/* 1. Hero - Belajar Lebih Seru, Pintar Lebih Cepat! */}
      <HeroSection />

      {/* 2. Feature - Belajar Lebih Dekat, Kapan Saja & Di Mana Saja */}
      <FeatureSection />

      {/* 3. Class Listing - Temukan Kelas Favoritmu */}
      <ClassListing />

      {/* 4. Why CirclePintar - Kenapa Harus Belajar */}
      <FeatureCards />

      {/* 5. Testimonials - Apa Kata Mereka */}
      <Testimonials />

      {/* 6. CTA - Siap Jadi Juara Kelas */}
      <CTASection />
    </main>
  );
}