import Layout from '@/components/Layout';
import { educationData } from '@/data/education';
import Image from 'next/image';

export default function EducationPage() {
  return (
    <Layout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Education
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            My academic background and educational qualifications.
          </p>
        </div>

        <div className="space-y-6">
          {educationData.map((edu, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={edu.logo}
                    alt={edu.logoAlt}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {edu.grade}
                    </span>
                  </div>
                  <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {edu.period}
                  </p>
                  {edu.skills && (
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
