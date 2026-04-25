import { getEducation } from '@/lib/services/portfolio';
import EducationSectionClient from './EducationSectionClient';

export default async function EducationSectionServer() {
  const education = await getEducation();
  
  return <EducationSectionClient education={education} />;
}
