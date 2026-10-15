import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import AboutSection from '@/components/home/AboutSection';

export const metadata: Metadata = {
  title: 'About',
  description: 'Senior Full-Stack & AI Engineer who combines years of building many kinds of apps with AI assistants to ship quickly.',
};

export default function AboutPage() {
  return (
    <Layout>
      <AboutSection />
    </Layout>
  );
}
