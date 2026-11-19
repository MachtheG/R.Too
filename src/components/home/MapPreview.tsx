import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";
import { wards, totalWardVoters } from "@data/wards";

export async function MapPreview({ locale }: { locale: string }) {
  const t = await getTranslations("home.map");
  const fmt = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE");
  const pct = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE", { style: "percent", maximumFractionDigits: 0 });
  const max = Math.max(...wards.map((w) => w.voters2022));
  const top = wards[0];

  return (
    <section aria-labelledby="map-title">
      <Container className="grid gap-10 py-14 md:grid-cols-5 md:py-20">
        <div className="flex flex-col gap-4 md:col-span-2">
          <p className="eyebrow text-laterite">{t("eyebrow")}</p>
          <h2 id="map-title" className="font-display text-4xl text-tea md:text-5xl dark:text-mist">{t("title")}</h2>
          <p className="text-lg leading-relaxed">
            {t("summary", { voters: fmt.format(top.voters2022), share: pct.format(top.voters2022 / totalWardVoters) })}
          </p>
          <Link href="/map" className="self-start font-semibold underline underline-offset-4 hover:text-laterite">{t("cta")} →</Link>
        </div>
        <figure className="flex flex-col gap-3 md:col-span-3">
          <figcaption className="eyebrow text-muted-foreground">{t("caption")}</figcaption>
          <ul className="flex flex-col gap-3">
            {wards.map((w) => (
              <li key={w.slug} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span>{w.name}</span>
                  <span className="font-mono">{fmt.format(w.voters2022)}</span>
                </div>
                <div className="h-2.5 bg-paper-2" aria-hidden>
                  <div className="h-full bg-laterite" style={{ width: `${(w.voters2022 / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[11px] text-muted-foreground">{t("source")}</p>
        </figure>
      </Container>
    </section>
  );
}
