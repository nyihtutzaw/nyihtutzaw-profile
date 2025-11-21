'use client';

import { useState } from 'react';
import { skillGroups } from '@/data/skills';
import SkillCard from './SkillCard';

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups[activeTab].skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;