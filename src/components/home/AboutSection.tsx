import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import {
  Squares2X2Icon,
  SparklesIcon,
  RocketLaunchIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const AboutSection = () => {
  const strengths = [
    {
      title: 'Experience across many kinds of apps',
      description: 'Web and mobile apps, e-commerce stores, healthcare systems, security products and AI agents. I have built them end to end, frontend to backend to cloud.',
      icon: Squares2X2Icon
    },
    {
      title: 'Strong with AI assistants',
      description: 'I use AI coding assistants every day to plan, write, test and review code. I know how to guide them well and how to check what they produce.',
      icon: SparklesIcon
    },
    {
      title: 'Together: I can build any app, fast',
      description: 'Experience tells me what to build and how it should work. AI lets me build it much faster. You get a working product in weeks, not months.',
      icon: RocketLaunchIcon
    }
  ];

  const quickFacts = [
    { label: 'Based in', value: 'Bangkok, Thailand' },
    { label: 'Building since', value: '2017' },
    { label: 'Focus', value: 'Full-Stack & AI' },
    { label: 'Now at', value: 'ArcFusion' }
  ];

  return (
    <section>
      <Reveal className="mb-14 max-w-3xl">
        <p className="eyebrow mb-3">About</p>
        <h1 className="text-4xl font-bold text-fg md:text-5xl">
          I build apps <span className="gradient-text">fast</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          I&apos;m a Senior Full-Stack & AI Engineer. Years of building real products, combined with AI assistants,
          let me take an idea to a working app quickly.
        </p>
      </Reveal>

      <div className="mb-16 grid gap-4 md:grid-cols-3">
        {strengths.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.title} delay={index * 90}>
              <SpotlightCard className="h-full p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-fg">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mb-16 max-w-3xl space-y-4">
        <h2 className="text-2xl font-semibold text-fg md:text-3xl">What I&apos;m doing now</h2>
        <p className="leading-relaxed text-muted">
          At ArcFusion I build AI data products: chat-with-your-data agents, an AI assistant for promotion managers,
          and a customer segmentation platform for a leading Thai retailer. Before that I built AI security products at RV Connex, e-commerce sites for Japanese brands, and
          healthcare systems at The Union in Myanmar.
        </p>
        <Link href="/experience" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
          See my full experience
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Reveal>

      <Reveal>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="card p-5">
              <dt className="font-mono text-xs text-primary">{fact.label}</dt>
              <dd className="mt-1.5 font-semibold text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal className="mt-20">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 text-center md:p-12">
          <div className="absolute -top-20 left-1/2 h-56 w-[30rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-fg md:text-3xl">Let&apos;s build something together</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted">
              Full-stack application, AI solution or technical consultation — I&apos;d love to hear what you&apos;re working on.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="rounded-full bg-primary px-6 py-3 font-medium text-primary-fg shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5">
                Get in touch
              </Link>
              <Link href="/projects" className="rounded-full border border-line bg-surface px-6 py-3 font-medium text-fg transition-colors hover:border-primary/50">
                View my work
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default AboutSection;
