import { Skill } from '@/types/skills';
import Image from 'next/image';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-12 h-12 relative">
        <Image
          src={skill.logo}
          alt={skill.name}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <h3 className="font-medium text-gray-900 dark:text-gray-100 text-center">
        {skill.name}
      </h3>
    </div>
  </div>
);

export default SkillCard;