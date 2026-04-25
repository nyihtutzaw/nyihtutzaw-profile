import { getWorkExperience } from '@/lib/services/portfolio';
import ExperienceSectionClient from './ExperienceSectionClient';

export default async function ExperienceSectionServer() {
  const experiences = await getWorkExperience();
  
  return <ExperienceSectionClient experiences={experiences} />;
}
