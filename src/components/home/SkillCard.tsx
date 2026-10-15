import { Skill } from '@/types/skills';
import Image from 'next/image';
import SpotlightCard from '@/components/ui/SpotlightCard';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => (
  <SpotlightCard className="flex items-center gap-4 p-4 hover:-translate-y-0.5">
    <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white">
      <Image src={skill.logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
    </div>
    <h3 className="font-sans text-sm font-medium text-fg">{skill.name}</h3>
  </SpotlightCard>
);

export default SkillCard;
