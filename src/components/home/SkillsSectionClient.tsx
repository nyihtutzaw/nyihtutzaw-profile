'use client';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { SkillGroup } from '@/types/database';

interface SkillsSectionClientProps {
  skillGroups: SkillGroup[];
}

const SkillsSectionClient = ({ skillGroups }: SkillsSectionClientProps) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="space-y-12">
            {skillGroups.map((group, groupIndex) => (
              <div key={group.id} className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                  {group.name}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {group.skills?.map((skill, skillIndex) => (
                    <div
                      key={skill.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-3"
                      style={{ 
                        transitionDelay: `${(groupIndex * 100) + (skillIndex * 50)}ms`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
                      }}
                    >
                      {skill.logo_url ? (
                        <img
                          src={skill.logo_url}
                          alt={skill.name}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSectionClient;
