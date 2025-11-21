import Layout from '@/components/Layout';
import SkillsSection from '@/components/home/SkillsSection';

export default function SkillsPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Technical Skills
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          My technical expertise and the technologies I work with.
        </p>
      </div>
      <SkillsSection />
    </Layout>
  );
}
