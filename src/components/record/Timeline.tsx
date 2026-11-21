import { getTranslations } from "next-intl/server";
import { timeline } from "@data/timeline";
import { pick } from "@/lib/i18n-helpers";
import { FootnoteMark } from "@/components/shared/FootnoteMark";
import { Pending } from "@/components/shared/Pending";

export async function Timeline({ locale }: { locale: string }) {
  const t = await getTranslations("record");
  return (
    <section aria-labelledby="timeline-title" className="flex flex-col gap-4">
      <h2 id="timeline-title" className="font-display text-3xl">{t("timeline")}</h2>
      <ol className="flex flex-col">
        {timeline.map((e, i) => (
          <li key={i} className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-rule py-4">
            <span className="font-mono text-sm text-pine">{e.year}</span>
            <span>
              <Pending text={pick(e.text, locale)} />
              {e.sourceIds.map((id, n) => <FootnoteMark key={id} n={n + 1} sourceId={id} label="Source" />)}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
