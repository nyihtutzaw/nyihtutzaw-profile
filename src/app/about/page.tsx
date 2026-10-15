import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import AboutSection from '@/components/home/AboutSection';

export const metadata: Metadata = {
  title: 'About',
  description: 'The journey from freelance developer and teacher to Senior Full-Stack & AI Engineer.',
};

export default function AboutPage() {
  return (
    <Layout>
      <AboutSection />
    </Layout>
  );
}
