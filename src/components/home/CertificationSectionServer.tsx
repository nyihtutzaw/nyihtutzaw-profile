import { getCertifications } from '@/lib/services/portfolio';
import CertificationSectionClient from './CertificationSectionClient';

export default async function CertificationSectionServer() {
  const certifications = await getCertifications();
  
  return <CertificationSectionClient certifications={certifications} />;
}
