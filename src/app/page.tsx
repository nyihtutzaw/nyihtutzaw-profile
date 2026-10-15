import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import Link from 'next/link';
import {
  ArrowUpRightIcon, SparklesIcon, GlobeAltIcon, DevicePhoneMobileIcon, ServerStackIcon,
  CloudIcon, ShoppingBagIcon, ShieldCheckIcon, UserGroupIcon,
} from '@heroicons/react/24/outline';
import { navWithIcons } from '@/components/nav';
import Reveal from '@/components/ui/Reveal';
import SpotlightCard from '@/components/ui/SpotlightCard';

const quickLinks = [
  { href: '/about', description: 'From teaching programming to shipping AI agents in production.' },
  { href: '/experience', description: 'Roles, teams and the systems I built along the way.' },
  { href: '/projects', description: 'A multi-client point of sale and a logistics management system.' },
  { href: '/skills', description: 'The languages, frameworks and tooling I reach for.' },
  { href: '/education', description: 'Degrees, certifications and ongoing study.' },
  { href: '/blog', description: 'Notes and tutorials published on Medium.' },
].map((l) => ({ ...l, ...navWithIcons.find((n) => n.href === l.href)! }));

const capabilities = [
  { icon: SparklesIcon, title: 'AI agents & LLM apps', detail: 'LangChain, LangGraph, OpenAI, Gemini, Claude' },
  { icon: GlobeAltIcon, title: 'Full-stack web', detail: 'React, Next.js, Node.js, TypeScript' },
  { icon: DevicePhoneMobileIcon, title: 'Mobile apps', detail: 'React Native and Flutter' },
  { icon: ServerStackIcon, title: 'Backend & APIs', detail: 'Python, Go, PHP, GraphQL, PostgreSQL' },
  { icon: CloudIcon, title: 'Cloud & DevOps', detail: 'AWS, Docker, Kubernetes, CI/CD' },
  { icon: ShoppingBagIcon, title: 'E-commerce', detail: 'Magento and React storefronts' },
  { icon: ShieldCheckIcon, title: 'Security & healthcare', detail: 'Cybersecurity platforms and patient-data systems' },
  { icon: UserGroupIcon, title: 'Tech leadership', detail: 'Leading cross-functional teams, mentoring' },
];

export default function Home() {
  return (
    <Layout>
      <HeroSection />

      <section className="py-16 md:py-24">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">Explore</p>
          <h2 className="text-3xl font-bold text-fg md:text-4xl">Find what you&apos;re looking for</h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <Reveal key={link.href} delay={i * 60}>
                <SpotlightCard as={Link} href={link.href} className="group block h-full p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-fg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRightIcon className="h-5 w-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-fg">{link.name}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{link.description}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Reveal>
        <section className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-14">
          <div className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow mb-3 text-center">What I can do for you</p>
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold text-fg md:text-5xl">
              One engineer from <span className="gradient-text">idea to production.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted">
              Whatever you&apos;re building, I can design it, ship it and keep it running.
            </p>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="rounded-2xl border border-line bg-bg/60 p-4">
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 font-medium text-fg">{c.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{c.detail}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-medium text-primary-fg shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
              >
                Tell me what you&apos;re building
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </Layout>
  );
}
