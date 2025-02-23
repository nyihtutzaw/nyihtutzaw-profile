
import HeroSection from '@/components/home/HeroSection';
import AboutSection from '@/components/home/AboutSection';
import EducationExperienceSection from '@/components/home/EducationExperienceSection';
import SkillsSection from '@/components/home/SkillsSection';
import CertificationSection from '@/components/home/CertificationSection';
import ProjectShowcase from '@/components/home/ProjectShowcase';
import BlogSection from '@/components/home/BlogSection';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <HeroSection />
      <AboutSection />
      <EducationExperienceSection />
      <SkillsSection />
      <ProjectShowcase />
      <CertificationSection />
      <BlogSection />
    </div>
  );
}
