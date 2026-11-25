import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "./navItems";
import { CountdownPill } from "./CountdownPill";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";

/** Preset A header: countdown utility bar → sticky header (seal, name/office, boxed nav, gold CTA) → draft notice. */
export async function SiteHeader() {
  const t = await getTranslations("common");
  const items = navItems.map((n) => ({ href: n.href, label: t(`nav.${n.key}`), primary: n.primary }));
  const involved = items.find((i) => i.href === "/get-involved")!;

  return (
    <>
      <div className="bg-primary text-paper">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-4 md:px-8">
          <CountdownPill />
          <LocaleSwitch />
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-4 py-2 md:px-8 md:py-3">
          <Link href="/" aria-label={t("homeLabel")} className="flex min-w-0 items-center gap-2.5 text-ink sm:gap-3 dark:text-paper">
            {/* Bomet County coat of arms (public domain; insignia: see data/credits.ts before launch). */}
            <Image src="/images/brand/bomet-coat-of-arms.png" alt={t("coatOfArms")} width={96} height={93} priority className="size-11 shrink-0 object-contain md:size-14 xl:size-16" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="font-display text-lg font-bold whitespace-nowrap md:text-xl">{t("candidate")}</span>
              <span className="eyebrow whitespace-nowrap text-muted-foreground">
                <span className="sm:hidden">{t("lockupShort")}</span>
                <span className="hidden sm:inline">{t("lockup")}</span>
              </span>
            </span>
          </Link>
          <nav aria-label={t("nav.label")} className="hidden xl:block">
            <ul className="flex gap-2 text-sm font-medium">
              {items.filter((i) => i.primary).map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="inline-flex min-h-10 items-center rounded-md border border-rule px-3 hover:border-primary hover:text-primary">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <Link href={involved.href} className="btn btn-primary hidden min-h-11 px-4 text-sm sm:inline-flex">{involved.label}</Link>
            <MobileMenu items={items.map(({ href, label }) => ({ href, label }))} menuLabel={t("nav.menu")} closeLabel={t("nav.close")} />
          </div>
        </div>
      </header>

      <p className="border-b border-accent/40 bg-gold-soft px-4 py-2 text-center text-sm text-ink">{t("footer.demo")}</p>
    </>
  );
}
