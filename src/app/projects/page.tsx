import Layout from '@/components/Layout';
import ProjectShowcase from '@/components/home/ProjectShowcase';

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A showcase of my recent work and personal projects.
        </p>
      </div>
      <ProjectShowcase />
    </Layout>
  );
}
