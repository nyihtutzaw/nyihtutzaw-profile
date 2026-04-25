import { getSkillGroups } from '@/lib/services/portfolio';
import SkillsSectionClient from './SkillsSectionClient';

export default async function SkillsSectionServer() {
  const skillGroups = await getSkillGroups();
  
  return <SkillsSectionClient skillGroups={skillGroups} />;
}
