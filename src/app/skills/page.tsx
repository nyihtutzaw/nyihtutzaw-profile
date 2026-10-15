import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import PageHeader from '@/components/ui/PageHeader';
import SkillsSection from '@/components/home/SkillsSection';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Languages, frameworks, AI tooling and infrastructure I work with.',
};

export default function SkillsPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Toolbox"
        title="Technical skills"
        description="The technologies I reach for, grouped by what they're used for."
      />
      <SkillsSection />
    </Layout>
  );
}
