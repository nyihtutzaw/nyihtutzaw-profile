import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import PageHeader from '@/components/ui/PageHeader';
import EducationExperienceSection from '@/components/home/EducationExperienceSection';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional journey across AI engineering, cybersecurity, e-commerce and healthcare technology.',
};

export default function ExperiencePage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Career"
        title="Work experience"
        description="My professional journey and the teams I've worked with."
      />
      <EducationExperienceSection />
    </Layout>
  );
}
