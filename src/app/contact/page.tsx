import type { Metadata } from 'next';
import {
  EnvelopeIcon,
  MapPinIcon,
  ArrowUpRightIcon,
  BoltIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import Layout from '@/components/Layout';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SocialLinks from '@/components/ui/SocialLinks';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for collaborations, engineering work or just to say hello.',
};

const services = [
  {
    title: 'Build your app fast',
    description: 'From idea to a working product: web, mobile or backend.',
    icon: BoltIcon
  },
  {
    title: 'Add AI to your product',
    description: 'AI agents, chat assistants and automation for your existing app.',
    icon: SparklesIcon
  },
  {
    title: 'Technical advice',
    description: 'Architecture planning, code review and picking the right tech stack.',
    icon: ChatBubbleLeftRightIcon
  }
];

export default function ContactPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="Reach out for collaborations, opportunities, or just to say hello."
      />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal className="card p-6 sm:p-8">
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <EnvelopeIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="eyebrow !text-[10px] !text-muted">Email</p>
                <a href={`mailto:${site.email}`} className="text-lg font-medium text-fg transition-colors hover:text-primary">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPinIcon className="h-5 w-5" />
              </span>
              <div>
                <p className="eyebrow !text-[10px] !text-muted">Location</p>
                <p className="text-lg font-medium text-fg">{site.location}</p>
              </div>
            </li>
          </ul>

          <div className="mt-8 border-t border-line pt-6">
            <p className="eyebrow mb-4 !text-muted">Find me elsewhere</p>
            <SocialLinks />
          </div>

          <a
            href={`mailto:${site.email}?subject=Hello%20${encodeURIComponent(site.name)}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-fg shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
          >
            Send an email <ArrowUpRightIcon className="h-4 w-4" />
          </a>
        </Reveal>

        <Reveal delay={100} className="card flex flex-col p-6 sm:p-8">
          <p className="eyebrow mb-5 !text-muted">What I can help with</p>
          <ul className="mb-8 space-y-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <li key={service.title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-fg">{service.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{service.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex items-start gap-3 border-t border-line pt-6">
            <span className="relative mt-1.5 flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <div>
              <p className="font-medium text-fg">Open to new projects</p>
              <p className="text-sm text-muted">Usually replies within 24 hours</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Layout>
  );
}
