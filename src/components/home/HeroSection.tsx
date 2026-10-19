'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownTrayIcon, ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { skillGroups } from '@/data/skills';
import { workExperienceData } from '@/data/experience';
import { site } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';
import Marquee from '@/components/ui/Marquee';
import SocialLinks from '@/components/ui/SocialLinks';

const CAREER_START_YEAR = 2019;

const marqueeSkills = skillGroups
  .filter((g) => ['AI', 'Programming', 'Backend', 'Devops'].includes(g.name))
  .flatMap((g) => g.skills);

const stats = [
  { value: `${new Date().getFullYear() - CAREER_START_YEAR}+`, label: 'Years building software' },
  { value: `${workExperienceData.length}`, label: 'Teams & companies' },
  { value: `${skillGroups.reduce((n, g) => n + g.skills.length, 0)}+`, label: 'Technologies used' },
];

const handleDownloadCV = async () => {
  // jsPDF is large — only fetch it when someone actually asks for the CV.
  const { generateCV } = await import('@/utils/generateCV');
  generateCV();
};

const HeroSection = () => (
  <section className="relative pt-6 pb-10 md:pt-12">
    <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Open to new opportunities · {site.location}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] text-fg sm:text-6xl lg:text-7xl">
            Experienced engineer, <span className="gradient-text">AI-accelerated delivery.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m <span className="font-medium text-fg">{site.name}</span>, a {site.role} who designs and ships
            across the stack — AI agents and LLM products, web and mobile apps, APIs, cloud infrastructure and
            e-commerce — and leads the teams that build them.
          </p>
        </Reveal>

        <Reveal delay={240} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-fg shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
          >
            View my work
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            onClick={handleDownloadCV}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-medium text-fg transition-all hover:-translate-y-0.5 hover:border-primary/50"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download CV
          </button>
        </Reveal>

        <Reveal delay={320} className="mt-8 flex flex-wrap items-center gap-4">
          <SocialLinks />
          <button
            onClick={() => window.dispatchEvent(new Event('open-chat'))}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/15"
          >
            <SparklesIcon className="h-4 w-4" />
            Ask my AI assistant
          </button>
        </Reveal>
      </div>

      <Reveal delay={200} className="mx-auto w-full max-w-sm lg:max-w-none">
        <div className="relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-2 shadow-2xl">
            <Image
              src="/profile.png"
              alt={`Portrait of ${site.name}`}
              width={640}
              height={640}
              priority
              sizes="(max-width: 1024px) 24rem, 28rem"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </div>
      </Reveal>
    </div>

    <Reveal delay={100} className="mt-16 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface/70 backdrop-blur">
      {stats.map((s) => (
        <div key={s.label} className="px-3 py-5 text-center sm:py-6">
          <p className="font-display text-3xl font-bold text-fg sm:text-4xl">{s.value}</p>
          <p className="mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
        </div>
      ))}
    </Reveal>

    <Reveal delay={150} className="mt-10">
      <p className="eyebrow mb-4 text-center !text-muted">Tools I work with</p>
      <Marquee>
        {marqueeSkills.map((skill) => (
          <span key={skill.name} className="chip gap-2 !py-1.5 !pl-1.5 !pr-3.5 !text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
              <Image src={skill.logo} alt="" width={16} height={16} className="h-4 w-4 object-contain" />
            </span>
            {skill.name}
          </span>
        ))}
      </Marquee>
    </Reveal>
  </section>
);

export default HeroSection;
