"use client";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import type { Project } from "@data/projects";
import { filterProjects, parseFilters, yearsOf } from "@/lib/projects";
import { FilterBar } from "./FilterBar";
import { ProjectsTable } from "./ProjectsTable";

type Props = { projects: Project[]; wards: { slug: string; name: string }[] };

export function ProjectsExplorer({ projects, wards }: Props) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const params = useSearchParams();
  const filters = parseFilters(params, wards.map((w) => w.slug));
  const list = filterProjects(projects, filters);

  return (
    <div className="flex flex-col gap-8">
      <FilterBar filters={filters} wards={wards} years={yearsOf(projects)} />
      <p aria-live="polite" className="tabular-nums text-sm">{list.length} / {projects.length}</p>
      {list.length ? <ProjectsTable projects={list} wards={wards} locale={locale} /> : <p className="max-w-2xl bg-mist px-4 py-4">{t("empty")}</p>}
    </div>
  );
}
