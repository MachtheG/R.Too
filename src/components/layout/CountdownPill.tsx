"use client";
import { useTranslations } from "next-intl";
import { daysUntilElection } from "@/lib/election";
import { useNow } from "./useNow";

export function CountdownPill() {
  const t = useTranslations("common.countdown");
  const now = useNow();
  const text = now ? t("days", { count: daysUntilElection(now) }) : t("date");

  return (
    <a
      href="/election-2027.ics"
      aria-label={`${t("label")}. ${t("addToCalendar")}`}
      className="inline-flex min-h-11 items-center rounded-full bg-uda px-3 font-mono text-[11px] tracking-wider text-ink uppercase md:px-4 md:text-xs"
    >
      <span suppressHydrationWarning>{text}</span>
      <span className="ml-2 hidden md:inline">· {t("date")}</span>
    </a>
  );
}
