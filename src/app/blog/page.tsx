import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import PageHeader from '@/components/ui/PageHeader';
import BlogSection from '@/components/home/BlogSection';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles and tutorials on AI, LLMs and software engineering, published on Medium.',
};

export default function BlogPage() {
  return (
    <Layout>
      <PageHeader eyebrow="Writing" title="Blog" description="Latest thoughts and articles on Medium." />
      <BlogSection />
    </Layout>
  );
}
