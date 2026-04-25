import Layout from '@/components/Layout';
import EducationSectionServer from '@/components/home/EducationSectionServer';

export default function EducationPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Education
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          My academic background and educational qualifications.
        </p>
      </div>
      <EducationSectionServer />
    </Layout>
  );
}
