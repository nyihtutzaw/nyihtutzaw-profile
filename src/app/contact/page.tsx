import type { Metadata } from 'next';
import Image from 'next/image';
import { EnvelopeIcon, MapPinIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import Layout from '@/components/Layout';
import PageHeader from '@/components/ui/PageHeader';
import Reveal from '@/components/ui/Reveal';
import SocialLinks from '@/components/ui/SocialLinks';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for collaborations, engineering work or just to say hello.',
};

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

        <Reveal delay={100} className="card flex flex-col items-center justify-center p-8 text-center">
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/40 p-1">
            <Image src="/profile.png" alt={`Portrait of ${site.name}`} fill sizes="144px" className="rounded-full object-cover" />
          </div>
          <p className="mt-5 font-display text-xl font-semibold text-fg">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            {site.role}, building across web, mobile, cloud and AI. Always open to discussing new opportunities.
          </p>
        </Reveal>
      </div>
    </Layout>
  );
}
