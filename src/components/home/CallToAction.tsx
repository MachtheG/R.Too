import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/shared/Container";

export async function CallToAction() {
  const t = await getTranslations("home.cta");
  return (
    <section aria-labelledby="cta-title" className="bg-uda text-ink">
      <Container className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-20">
        <h2 id="cta-title" className="font-display text-4xl md:text-5xl">{t("title")}</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/get-involved" className="inline-flex min-h-12 items-center justify-center bg-ink px-6 font-semibold text-mist hover:bg-tea">
            {t("volunteer")}
          </Link>
          <Link href="/get-involved#whatsapp" className="inline-flex min-h-12 items-center justify-center border border-ink px-6 font-semibold hover:bg-ink hover:text-mist">
            {t("whatsapp")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
