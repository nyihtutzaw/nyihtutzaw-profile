import { getAbout, getCoreValues, getTimelineEvents } from '@/lib/services/portfolio';
import AboutSectionClient from './AboutSectionClient';

export default async function AboutSectionServer() {
  const [about, coreValues, timelineEvents] = await Promise.all([
    getAbout(),
    getCoreValues(),
    getTimelineEvents(),
  ]);
  
  return (
    <AboutSectionClient 
      about={about} 
      coreValues={coreValues} 
      timelineEvents={timelineEvents} 
    />
  );
}
