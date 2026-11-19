import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/PageHeader";
import { Container } from "@/components/shared/Container";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { tabMetadata } from "@/lib/i18n-helpers";
import { photos } from "@data/photos";

export const generateMetadata = () => tabMetadata("gallery");

export default async function GalleryPage() {
  const t = await getTranslations("gallery");
  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <Container className="py-12">
        <Suspense fallback={null}>
          <GalleryGrid photos={photos} />
        </Suspense>
      </Container>
    </>
  );
}
