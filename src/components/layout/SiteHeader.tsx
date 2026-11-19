import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "./navItems";
import { CountdownPill } from "./CountdownPill";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";

export async function SiteHeader() {
  const t = await getTranslations("common");
  const items = navItems.map((n) => ({ href: n.href, label: t(`nav.${n.key}`), primary: n.primary }));

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3 px-4 py-2 md:px-8 md:py-3">
        <Link href="/" className="font-display text-lg font-semibold text-tea md:text-xl dark:text-mist">
          {t("candidate")}
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
        <div className="flex items-center gap-2">
          <CountdownPill />
          <LocaleSwitch />
          <MobileMenu items={items.map(({ href, label }) => ({ href, label }))} menuLabel={t("nav.menu")} closeLabel={t("nav.close")} />
        </div>
      </div>
    </header>
  );
}
