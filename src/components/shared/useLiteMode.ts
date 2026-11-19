"use client";
import { useSyncExternalStore } from "react";

// Lite mode: on when the visitor chooses it, or when the browser sends Save-Data.
const KEY = "lite-mode";
const listeners = new Set<() => void>();

function read(): boolean {
  try {
    const v = localStorage.getItem(KEY);
    if (v !== null) return v === "1";
  } catch {}
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

export function setLiteMode(on: boolean) {
  try { localStorage.setItem(KEY, on ? "1" : "0"); } catch {}
  document.documentElement.dataset.lite = on ? "1" : "0";
  listeners.forEach((l) => l());
}

export function useLiteMode(): boolean {
  return useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    read,
    () => false,
  );
}
