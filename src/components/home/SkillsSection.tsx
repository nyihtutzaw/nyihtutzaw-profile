'use client';

import { useState } from 'react';
import { skillGroups } from '@/data/skills';
import SkillCard from './SkillCard';
import Reveal from '@/components/ui/Reveal';

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
        {skillGroups.map((group, index) => (
          <button
            key={group.name}
            role="tab"
            aria-selected={activeTab === index}
            onClick={() => setActiveTab(index)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === index
                ? 'border-primary bg-primary text-primary-fg'
                : 'border-line bg-surface text-muted hover:border-primary/50 hover:text-fg'
            }`}
          >
            {group.name}
            <span className="ml-1.5 text-xs opacity-60">{group.skills.length}</span>
          </button>
        ))}
      </div>

      {/* key remounts the grid so each tab re-plays the reveal */}
      <div key={activeTab} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {skillGroups[activeTab].skills.map((skill, index) => (
          <Reveal key={skill.name} delay={index * 40}>
            <SkillCard skill={skill} />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
