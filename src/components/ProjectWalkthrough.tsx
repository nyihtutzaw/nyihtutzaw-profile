import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import type { ProjectStep } from '@/data/projects';

/** Vertical-scroll presentation: one step per screen, text beside a framed screenshot. */
const ProjectWalkthrough = ({ steps, device = 'web' }: { steps: ProjectStep[]; device?: 'web' | 'mobile' }) => (
  <section aria-label="Walkthrough" className="mt-16">
    <h2 className="eyebrow mb-2">Walkthrough</h2>
    {steps.map((step, i) => (
      <div key={step.title} className="grid min-h-[70vh] items-center gap-8 border-t border-line py-12 lg:grid-cols-[5fr_7fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow !text-primary">
            Step {i + 1} of {steps.length}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-fg md:text-3xl">{step.title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{step.description}</p>
          {step.bullets && (
            <ul className="mt-5 space-y-2 text-fg">
              {step.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
        <Reveal delay={120}>
          {device === 'mobile' ? (
            // store screenshots already include a phone frame: show them on a light panel, phone-sized
            <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[2rem] bg-[#fafafa] shadow-xl">
              <Image src={step.image} alt={step.imageAlt} width={1242} height={2688} sizes="340px" className="h-auto w-full" />
            </div>
          ) : (
            <div className="card overflow-hidden shadow-xl">
              <div className="flex h-7 items-center gap-1.5 border-b border-line px-3">
                <i className="h-2 w-2 rounded-full bg-line" />
                <i className="h-2 w-2 rounded-full bg-line" />
                <i className="h-2 w-2 rounded-full bg-line" />
              </div>
              <Image src={step.image} alt={step.imageAlt} width={2880} height={1800} sizes="(min-width: 1024px) 58vw, 100vw" className="h-auto w-full" />
            </div>
          )}
        </Reveal>
      </div>
    ))}
  </section>
);

export default ProjectWalkthrough;
