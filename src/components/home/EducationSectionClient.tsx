'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { Education } from '@/types/database';

interface EducationSectionClientProps {
  education: Education[];
}

const EducationSectionClient = ({ education }: EducationSectionClientProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  edu.is_highlighted ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {edu.logo_url ? (
                      <img
                        src={edu.logo_url}
                        alt={edu.logo_alt || edu.institution}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">
                          {edu.institution.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        {edu.is_current && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span>{edu.period}</span>
                        {edu.grade && (
                          <>
                            <span>•</span>
                            <span>{edu.grade}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {edu.skills && edu.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {edu.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSectionClient;
