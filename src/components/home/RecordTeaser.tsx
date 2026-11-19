import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { PhotoPlaceholder } from "@/components/shared/PhotoPlaceholder";

export async function RecordTeaser() {
  const t = await getTranslations("home.record");
  return (
    <section aria-labelledby="record-title" className="border-b border-rule">
      <Container className="grid gap-8 py-14 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-4">
          <p className="eyebrow text-laterite">{t("eyebrow")}</p>
          <h2 id="record-title" className="font-display text-4xl text-tea md:text-5xl dark:text-mist">{t("title")}</h2>
          <p className="max-w-lg text-lg leading-relaxed text-ink-soft dark:text-mist/85">{t("body")}</p>
          <p className="border-l-0 bg-paper-2 px-4 py-3 font-mono text-xs">{t("pending")}</p>
          <Link href="/record" className="self-start font-semibold underline underline-offset-4 hover:text-laterite">{t("cta")} →</Link>
        </div>
        <PhotoPlaceholder ratio="16/9" label="Photo · 16:9" note="Robert Too at a community project site" />
      </Container>
    </section>
  );
}
