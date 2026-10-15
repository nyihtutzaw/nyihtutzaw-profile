import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import PageHeader from '@/components/ui/PageHeader';
import ProjectShowcase from '@/components/home/ProjectShowcase';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Business systems for retail and logistics, walked through step by step.',
};

export default function ProjectsPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Selected work"
        title="Projects"
        description="Business systems I've built for clients: a multi-client point of sale for retail and a logistics platform for freight, each walked through step by step."
      />
      <ProjectShowcase />
    </Layout>
  );
}
