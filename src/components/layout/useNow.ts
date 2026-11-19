"use client";
import { useSyncExternalStore } from "react";

// Returns null during SSR/prerender so the static shell never bakes in a stale date.
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};
let cached = 0;
const getSnapshot = () => {
  const minute = Math.floor(Date.now() / 60_000);
  if (minute !== cached) cached = minute;
  return cached;
};
const getServerSnapshot = () => null;

export function useNow(): Date | null {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return minute === null ? null : new Date(minute * 60_000);
}
