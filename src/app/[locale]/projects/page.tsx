import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { tabMetadata } from "@/lib/i18n-helpers";
import { projects } from "@data/projects";
import { wards } from "@data/wards";

export const generateMetadata = () => tabMetadata("projects");

export default async function ProjectsPage() {
  const t = await getTranslations("projects");
  const wardOptions = wards.map((w) => ({ slug: w.slug, name: w.name }));
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="py-10 pb-16">
        <Suspense fallback={<p className="font-mono text-xs">…</p>}>
          <ProjectsExplorer projects={projects} wards={wardOptions} />
        </Suspense>
      </Container>
    </>
  );
}
