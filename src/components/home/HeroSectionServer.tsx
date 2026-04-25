import { getProfile } from '@/lib/services/portfolio';
import HeroSectionClient from './HeroSectionClient';

export default async function HeroSectionServer() {
  const profile = await getProfile();
  
  return <HeroSectionClient profile={profile} />;
}
