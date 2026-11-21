"use client";
import { useTranslations } from "next-intl";
import { daysUntilElection } from "@/lib/election";
import { useNow } from "./useNow";

/**
 * Header pill. Before the client knows today's date (static HTML, crawlers, no-JS)
 * it shows the election date once; after hydration it shows "N days · date".
 */
export function CountdownPill() {
  const t = useTranslations("common.countdown");
  const now = useNow();

  return (
    <a
      href="/election-2027.ics"
      aria-label={`${t("label")}. ${t("addToCalendar")}`}
      className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-uda px-3 font-mono text-[11px] tracking-wider whitespace-nowrap text-ink uppercase md:px-4 md:text-xs"
    >
      {now ? (
        <>
          <span>{t("days", { count: daysUntilElection(now) })}</span>
          <span className="ml-2 hidden md:inline">· {t("date")}</span>
        </>
      ) : (
        <span>{t("date")}</span>
      )}
    </a>
  );
}
