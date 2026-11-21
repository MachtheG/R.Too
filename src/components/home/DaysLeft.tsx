"use client";
import { daysUntilElection } from "@/lib/election";
import { useNow } from "@/components/layout/useNow";

type Props = { numberClass: string; labelClass: string; daysLabel: string; dayLabel: string; electionDay: string; fallback: string };

/**
 * Live day count to 10 Aug 2027 (Nairobi time), computed on the client so the
 * static page never bakes in a stale number. Before hydration (crawlers, no-JS)
 * it shows the election date instead of an empty dash.
 */
export function DaysLeft({ numberClass, labelClass, daysLabel, dayLabel, electionDay, fallback }: Props) {
  const now = useNow();
  if (!now) {
    return <span className={numberClass}>{fallback}</span>;
  }
  const n = daysUntilElection(now);
  return (
    <>
      <span className={numberClass}>{n === 0 ? electionDay : n.toLocaleString("en-KE")}</span>
      {n > 0 && <span className={labelClass}>{n === 1 ? dayLabel : daysLabel}</span>}
    </>
  );
}
