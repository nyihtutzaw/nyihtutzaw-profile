'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { workExperienceData } from '@/data/experience';
import { formatPeriod } from '@/utils/dateUtils';
import Reveal from '@/components/ui/Reveal';

const WorkExperienceColumn = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-10">
      {workExperienceData.map((exp, index) => {
        const isOpen = openIndex === index;
        const isCurrent = exp.endDate === null;
        return (
          <li key={`${exp.company}-${exp.startDate}`} className="relative">
            <span
              className={`absolute -left-[31px] top-7 flex h-4 w-4 items-center justify-center rounded-full border-2 sm:-left-[47px] ${
                isCurrent ? 'border-primary bg-primary shadow-lg shadow-primary/40' : 'border-line bg-bg'
              }`}
              aria-hidden="true"
            />
            <Reveal delay={index * 50}>
              <article className="card p-5 transition-colors hover:border-primary/30 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line bg-white">
                    <Image src={exp.logo} alt={exp.logoAlt} fill sizes="56px" className="object-contain p-1.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-primary">{formatPeriod(exp.startDate, exp.endDate)}</p>
                    <h3 className="mt-1 text-xl font-semibold text-fg">{exp.title}</h3>
                    <p className="text-muted">{exp.company.split(' (')[0]}</p>
                    <p className="mt-0.5 text-sm text-muted/80">
                      {exp.type} · {exp.location}
                    </p>
                  </div>
                  {isCurrent && (
                    <span className="chip hidden !border-success/30 !bg-success/10 !text-success sm:inline-flex">Current</span>
                  )}
                </div>

                {exp.description && <p className="mt-4 leading-relaxed text-muted">{exp.description}</p>}

                {exp.skills && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="chip">{skill}</span>
                    ))}
                  </div>
                )}

                {exp.details && (
                  <>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`exp-details-${index}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                    >
                      {isOpen ? 'Hide details' : 'View details'}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div
                      id={`exp-details-${index}`}
                      className={`grid transition-all duration-500 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="rich mt-4 border-t border-line pt-4" dangerouslySetInnerHTML={{ __html: exp.details }} />
                      </div>
                    </div>
                  </>
                )}
              </article>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
};

export default WorkExperienceColumn;
