import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import PageHeader from '@/components/ui/PageHeader';
import ProjectShowcase from '@/components/home/ProjectShowcase';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Business systems and mobile apps for retail, logistics, recruitment and more, walked through step by step.',
};

export default function ProjectsPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Selected work"
        title="Projects"
        description="Business systems and mobile apps I've built: point of sale, logistics and recruitment platforms, plus apps on Google Play and the App Store, each walked through step by step."
      />
      <ProjectShowcase />
    </Layout>
  );
}
