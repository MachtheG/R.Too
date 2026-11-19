import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { projects } from "@data/projects";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { pick } from "@/lib/i18n-helpers";

// Cache Components requires at least one param. While the ledger is empty, a sentinel
// slug is prerendered and resolves to notFound(). It disappears once a project exists.
const EMPTY_SENTINEL = "_none";

export function generateStaticParams() {
  return projects.length ? projects.map((p) => ({ slug: p.slug })) : [{ slug: EMPTY_SENTINEL }];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const locale = await rootLocale();
  return p ? { title: pick(p.name, locale), description: pick(p.summary, locale) } : {};
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((x) => x.slug === slug);
  if (!project) notFound();
  const locale = await rootLocale();
  return <ProjectDetail project={project} locale={locale} />;
}
