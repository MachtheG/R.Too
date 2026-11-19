import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { locale as rootLocale } from "next/root-params";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { tabMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "../globals.css";

// Only the display face is preloaded: it paints the hero H1 (the LCP element).
const fraunces = Fraunces({ subsets: ["latin"], weight: ["300", "400", "600"], variable: "--font-fraunces" });
const frauncesItalic = Fraunces({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-fraunces-italic", preload: false });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-inter", preload: false });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-plex-mono", preload: false });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const base = await tabMetadata("home");
  return { ...base, metadataBase: new URL(siteUrl), title: { default: String(base.title), template: "%s · Robert Too" } };
}

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await rootLocale();
  const t = await getTranslations("common");

  return (
    <html lang={locale} className={`${fraunces.variable} ${frauncesItalic.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="min-h-dvh flex flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-uda focus:px-4 focus:py-2 focus:text-ink">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <SiteHeader />
          <main id="main" className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
