import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "./navItems";
import { CountdownPill } from "./CountdownPill";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";
import { BrandMark } from "./BrandMark";

export async function SiteHeader() {
  const t = await getTranslations("common");
  const items = navItems.map((n) => ({ href: n.href, label: t(`nav.${n.key}`), primary: n.primary }));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-4 py-2 md:px-8 md:py-3">
        <Link href="/" aria-label={t("homeLabel")} className="flex min-w-0 items-center gap-2.5 text-tea sm:gap-3 dark:text-mist">
          <BrandMark className="size-11 md:size-16 xl:size-24" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-lg font-semibold whitespace-nowrap md:text-xl">{t("candidate")}</span>
            <span className="font-mono text-[10px] tracking-wider whitespace-nowrap text-muted-foreground uppercase md:text-[11px]">
              <span className="sm:hidden">{t("lockupShort")}</span>
              <span className="hidden sm:inline">{t("lockup")}</span>
            </span>
          </span>
        </Link>
        <nav aria-label={t("nav.label")} className="hidden xl:block">
          <ul className="flex gap-6 text-sm">
            {items.filter((i) => i.primary).map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="hover:text-laterite">{i.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <CountdownPill />
          <LocaleSwitch />
          <MobileMenu items={items.map(({ href, label }) => ({ href, label }))} menuLabel={t("nav.menu")} closeLabel={t("nav.close")} />
        </div>
      </div>
    </header>
  );
}
