import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TeamSection from '@/components/home/TeamSection';
import PlatformsSection from '@/components/home/PlatformsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import NewsSection from '@/components/home/NewsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <ServicesSection />
      <TeamSection />
      <PlatformsSection />
      <ProjectsSection />
      <NewsSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
