"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { allProjects, projectCategories } from "@/data/projects";
import { formatPeriod } from "@/utils/dateUtils";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

const ProjectShowcase = () => {
  const [filter, setFilter] =
    useState<(typeof projectCategories)[number]>("All");
  const visible = allProjects.filter(
    (p) => filter === "All" || p.category === filter,
  );

  return (
    <section>
      {projectCategories.length > 2 && (
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === cat
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-line bg-surface text-muted hover:border-primary/50 hover:text-fg"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={i * 70}>
            <SpotlightCard
              as={Link}
              href={`/projects/${project.slug}`}
              className="group flex h-full flex-col p-6 md:p-8"
            >
              {project.thumbnail && (
                <div className="relative -mx-2 mb-6 aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="flex items-start gap-4">
                {project.logo && (
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line bg-white">
                    <Image
                      src={project.logo}
                      alt={project.logoAlt ?? ""}
                      fill
                      sizes="56px"
                      className="object-contain p-1.5"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="chip !border-primary/30 !bg-primary/10 !text-primary">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="eyebrow !text-[10px]">Featured</span>
                    )}
                  </div>
                  <p className="mt-2 truncate text-sm text-muted">
                    {project.role} · {project.org}
                  </p>
                </div>
                <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-fg md:text-2xl">
                {project.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">
                {project.summary}
              </p>

              {project.highlights && project.featured && (
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                {project.skills.slice(0, 5).map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
                {project.startDate && (
                  <span className="ml-auto font-mono text-xs text-muted">
                    {
                      formatPeriod(
                        project.startDate,
                        project.endDate ?? null,
                      ).split(" · ")[0]
                    }
                  </span>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;
