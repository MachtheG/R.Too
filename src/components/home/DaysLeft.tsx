"use client";
import { daysUntilElection } from "@/lib/election";
import { useNow } from "@/components/layout/useNow";

/** Day count rendered on the client only; shows an em dash in the static shell. */
export function DaysLeft({ className }: { className?: string }) {
  const now = useNow();
  return <span className={className}>{now ? daysUntilElection(now) : "—"}</span>;
}
