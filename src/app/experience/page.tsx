import Layout from '@/components/Layout';
import EducationExperienceSection from '@/components/home/EducationExperienceSection';

export default function ExperiencePage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Work Experience
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          My professional journey and the companies I've worked with.
        </p>
      </div>
      <EducationExperienceSection />
    </Layout>
  );
}
