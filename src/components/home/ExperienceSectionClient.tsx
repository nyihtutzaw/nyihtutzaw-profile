'use client';

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { WorkExperience } from '@/types/database';
import MarkdownContent from '@/components/ui/MarkdownContent';

interface ExperienceSectionClientProps {
  experiences: WorkExperience[];
}

const ExperienceSectionClient = ({ experiences }: ExperienceSectionClientProps) => {
  const { ref, isVisible } = useScrollAnimation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {exp.logo_url ? (
                      <img
                        src={exp.logo_url}
                        alt={exp.logo_alt || exp.company}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">
                          {exp.company.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span>{exp.employment_type}</span>
                        <span>•</span>
                        <span>{exp.period}</span>
                      </div>
                      {exp.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {exp.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="mt-4 text-gray-600 dark:text-gray-300">
                      {exp.description}
                    </p>
                  )}

                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {exp.details && (
                    <>
                      <button
                        onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                        className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                      >
                        {expandedId === exp.id ? 'Show Less' : 'Show More'}
                      </button>
                      
                      {expandedId === exp.id && (
                        <div className="mt-4">
                          <MarkdownContent content={exp.details} />
                        </div>
                      )}
                    </>
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

export default ExperienceSectionClient;
