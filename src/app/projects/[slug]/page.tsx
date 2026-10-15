import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Layout from "@/components/Layout";
import Reveal from "@/components/ui/Reveal";
import ProjectWalkthrough from "@/components/ProjectWalkthrough";
import { allProjects, getProject } from "@/data/projects";
import { formatPeriod } from "@/utils/dateUtils";

type Params = { slug: string };

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = allProjects.findIndex((p) => p.slug === project.slug);
  const next = allProjects[(index + 1) % allProjects.length];

  return (
    <Layout>
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
      >
        <ArrowLeftIcon className="h-4 w-4" /> All projects
      </Link>

      <Reveal className="max-w-3xl">
        <span className="chip !border-primary/30 !bg-primary/10 !text-primary">
          {project.category}
        </span>
        <h1 className="mt-4 text-4xl font-bold text-fg md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {project.summary}
        </p>
      </Reveal>

      <Reveal delay={100} className="card mt-10 grid gap-6 p-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          {project.logo && (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-line bg-white">
              <Image
                src={project.logo}
                alt={project.logoAlt ?? ""}
                fill
                sizes="48px"
                className="object-contain p-1"
              />
            </div>
          )}
          <div className="min-w-0">
            <p className="eyebrow !text-[10px] !text-muted">
              {project.standalone ? "Type" : "Company"}
            </p>
            <p className="text-sm font-medium text-fg">{project.org}</p>
          </div>
        </div>
        <div>
          <p className="eyebrow !text-[10px] !text-muted">Role</p>
          <p className="text-sm font-medium text-fg">{project.role}</p>
        </div>
        {(project.startDate || project.period) && (
          <div>
            <p className="eyebrow !text-[10px] !text-muted">Period</p>
            <p className="text-sm font-medium text-fg">
              {project.startDate
                ? formatPeriod(project.startDate, project.endDate ?? null)
                : project.period}
            </p>
          </div>
        )}
      </Reveal>

      {project.steps && <ProjectWalkthrough steps={project.steps} />}

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <Reveal>
          {project.details ? (
            <div
              className="rich max-w-none"
              dangerouslySetInnerHTML={{ __html: project.details }}
            />
          ) : (
            <p className="text-muted">{project.summary}</p>
          )}
        </Reveal>
        <Reveal delay={100}>
          <h2 className="eyebrow mb-4">Tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {allProjects.length > 1 && (
        <Link
          href={`/projects/${next.slug}`}
          className="card group mt-16 flex items-center justify-between p-6 transition-colors hover:border-primary/40"
        >
          <div>
            <p className="eyebrow !text-[10px] !text-muted">Next project</p>
            <p className="mt-1 text-lg font-semibold text-fg">{next.title}</p>
          </div>
          <ArrowRightIcon className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </Link>
      )}
    </Layout>
  );
}
