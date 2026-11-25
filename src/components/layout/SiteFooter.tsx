import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "./navItems";
import { LiteToggle } from "./LiteToggle";

/** Preset A footer: seal + name, primary CTA, grouped links, sources/credits/privacy and the lite toggle. */
export async function SiteFooter() {
  const t = await getTranslations("common");
  const link = "inline-flex min-h-11 items-center hover:text-accent";

  return (
    <footer className="bg-ink text-paper/80">
      <div className="mx-auto grid max-w-screen-xl gap-10 px-4 py-12 md:grid-cols-12 md:px-8 md:py-16">
        <div className="flex flex-col gap-4 md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-paper p-1">
              <Image src="/images/brand/bomet-coat-of-arms.png" alt="" width={48} height={47} className="size-12 object-contain" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-xl font-bold text-paper">{t("candidate")}</span>
              <span className="eyebrow text-paper/70">{t("lockup")}</span>
            </span>
          </div>
          <p className="font-display text-2xl text-paper">{t("footer.tagline")}</p>
          <Link href="/get-involved" className="btn btn-primary self-start">{t("nav.involved")}</Link>
        </div>

        <nav aria-label={t("nav.label")} className="md:col-span-4">
          <p className="eyebrow mb-2 text-accent">{t("nav.label")}</p>
          <ul className="grid grid-cols-2 gap-x-6 text-sm">
            {navItems.map((n) => (
              <li key={n.href}><Link href={n.href} className={link}>{t(`nav.${n.key}`)}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-2 text-accent">{t("nav.more")}</p>
          <ul className="flex flex-col text-sm">
            <li><Link href="/sources" className={link}>{t("footer.sources")}</Link></li>
            <li><Link href="/credits" className={link}>{t("footer.credits")}</Link></li>
            <li><Link href="/privacy" className={link}>{t("footer.privacy")}</Link></li>
            <li><LiteToggle /></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-1 px-4 py-5 text-xs md:flex-row md:justify-between md:px-8">
          <p>{t("footer.authorised")}</p>
          <p className="font-semibold text-paper">{t("footer.demo")}</p>
        </div>
      </div>
    </footer>
  );
}
