import type { Metadata } from 'next';
import Image from 'next/image';
import Layout from '@/components/Layout';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import { educationData } from '@/data/education';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Academic background and qualifications, including an MSc in Computer Science at Mahidol University.',
};

export default function EducationPage() {
  return (
    <Layout>
      <PageHeader eyebrow="Learning" title="Education" description="My academic background and qualifications." />

      <div className="space-y-5">
        {educationData.map((edu, index) => (
          <Reveal key={`${edu.institution}-${edu.degree}`} delay={index * 60}>
            <article className="card p-5 transition-colors hover:border-primary/30 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line bg-white">
                  <Image src={edu.logo} alt={edu.logoAlt} fill sizes="56px" className="object-contain p-1.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-fg sm:text-xl">{edu.degree}</h3>
                    {edu.isCurrent && (
                      <span className="chip !border-success/30 !bg-success/10 !text-success">In progress</span>
                    )}
                  </div>
                  <p className="mt-1 text-primary">{edu.institution}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">
                    {edu.period}
                    {edu.grade && !edu.isCurrent ? ` · ${edu.grade}` : ''}
                  </p>
                  {edu.skills && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {edu.skills.map((skill) => (
                        <span key={skill} className="chip">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Layout>
  );
}
