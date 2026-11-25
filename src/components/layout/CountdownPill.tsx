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
      className="inline-flex min-h-11 shrink-0 items-center gap-2 text-xs font-semibold tracking-[0.1em] whitespace-nowrap uppercase tabular-nums hover:underline"
    >
      {now ? (
        <>
          <span aria-hidden className="size-2 rounded-full bg-accent" />
          <span>{t("days", { count: daysUntilElection(now) })}</span>
          <span className="hidden text-paper/80 md:inline">· {t("date")}</span>
        </>
      ) : (
        <span>{t("date")}</span>
      )}
    </a>
  );
}
