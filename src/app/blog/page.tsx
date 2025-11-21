import Layout from '@/components/Layout';
import BlogSection from '@/components/home/BlogSection';

export default function BlogPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          My latest thoughts and articles on Medium.
        </p>
      </div>
      <BlogSection />
    </Layout>
  );
}
