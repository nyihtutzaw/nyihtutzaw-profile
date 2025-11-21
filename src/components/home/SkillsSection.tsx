'use client';

import { useState } from 'react';
import { skillGroups } from '@/data/skills';
import SkillCard from './SkillCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {skillGroups.map((group, index) => (
            <button
              key={group.name}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeTab === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              {group.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={`transition-all duration-1000 delay-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGroups[activeTab].skills.map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                skill={skill}
                style={{ transitionDelay: `${400 + index * 50}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;