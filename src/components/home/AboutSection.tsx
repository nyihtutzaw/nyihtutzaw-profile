import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { 
  CodeBracketIcon, 
  CloudArrowUpIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const AboutSection = () => {
  const timelineEvents = [
    {
      year: '2017-2019',
      title: 'Early Development Journey',
      description: 'Started as a freelance developer while teaching programming, gaining hands-on experience with modern web technologies and building foundational skills.',
      icon: CodeBracketIcon
    },
    {
      year: '2019-2024',
      title: 'Healthcare Tech Leadership',
      description: 'Led development teams at Union Myanmar, implementing scalable healthcare solutions and mentoring junior developers while mastering cloud technologies.',
      icon: HeartIcon
    },
    {
      year: '2023-2024',
      title: 'E-Commerce Excellence',
      description: 'Developed robust e-commerce platforms for Japanese brands, specializing in Magento customization and React-based frontend solutions.',
      icon: CloudArrowUpIcon
    },
    {
      year: '2024-2025',
      title: 'Cybersecurity Innovation',
      description: 'Led AI-powered security solutions development at RV Connex, integrating advanced technologies for enterprise-level protection systems.',
      icon: LightBulbIcon
    },
{
      year: '2024-Present',
      title: 'AI Agents for Consumer Brands',
      description: 'Developing AI agents for Revenue Growth Management at ArcFusion for a US-based consumer goods client - optimizing pricing, promotions, assortment, and demand forecasting for consumer goods brands.',
      icon: RocketLaunchIcon
    }
  ];

  const coreValues = [
    {
      title: 'Innovation',
      description: 'Constantly exploring new technologies and approaches to solve complex problems',
      icon: LightBulbIcon
    },
    {
      title: 'Quality',
      description: 'Committed to writing clean, maintainable code and delivering exceptional user experiences',
      icon: CodeBracketIcon
    },
    {
      title: 'Growth',
      description: 'Continuous learning and skill development to stay at the forefront of technology',
      icon: AcademicCapIcon
    }
  ];

  return (
    <section>
      <Reveal className="mb-14 max-w-3xl">
        <p className="eyebrow mb-3">About</p>
        <h1 className="text-4xl font-bold text-fg md:text-5xl">
          From teaching code to <span className="gradient-text">shipping AI</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          A passionate developer turned Senior Full-Stack & AI Engineer. My journey is driven by curiosity, innovation and the pursuit of
          excellence in every line of code.
        </p>
      </Reveal>

      <div className="mb-20 grid gap-10 md:grid-cols-2 lg:gap-14">
        <Reveal className="space-y-5">
          <h2 className="text-2xl font-semibold text-fg md:text-3xl">More than just code</h2>
          <p className="leading-relaxed text-muted">
            I believe technology should serve humanity. Throughout my career I&apos;ve focused on solutions that make a real
            difference — whether it&apos;s healthcare systems that save lives or AI applications that unlock human potential.
          </p>
          <p className="leading-relaxed text-muted">
            Based in Bangkok, Thailand, I bring a global perspective to every project, having worked with clients and teams
            across Asia and beyond. My approach combines technical expertise with a deep understanding of business needs and
            user experience.
          </p>
        </Reveal>

        <div className="grid gap-4">
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <Reveal key={value.title} delay={index * 90}>
                <SpotlightCard className="flex items-start gap-4 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-fg">{value.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{value.description}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal>
        <h2 className="mb-10 text-2xl font-semibold text-fg md:text-3xl">Career timeline</h2>
      </Reveal>
      <ol className="relative ml-3 space-y-8 border-l border-line pl-8 sm:ml-0 sm:pl-10">
        {timelineEvents.map((event, index) => {
          const Icon = event.icon;
          const isLast = index === timelineEvents.length - 1;
          return (
            <li key={event.year} className="relative">
              <span
                className={`absolute -left-[45px] top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 sm:-left-[53px] ${
                  isLast ? 'border-primary bg-primary text-primary-fg shadow-lg shadow-primary/30' : 'border-line bg-surface text-muted'
                }`}
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" />
              </span>
              <Reveal delay={index * 60}>
                <article className="card p-5 transition-colors hover:border-primary/30 sm:p-6">
                  <p className="font-mono text-xs text-primary">{event.year}</p>
                  <h3 className="mt-1.5 text-lg font-semibold text-fg sm:text-xl">{event.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{event.description}</p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>

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
