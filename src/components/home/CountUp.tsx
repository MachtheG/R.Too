"use client";
import { useEffect, useRef, useState } from "react";

type Props = { value: number; locale: string; suffix?: string; prefix?: string };

/**
 * Renders the final value on the server (no-JS and crawlers see the real number);
 * counts up once (600 ms, ease-out) when scrolled into view. Skipped under reduced motion or lite mode.
 * Plain IntersectionObserver + rAF keeps this off the critical path (no animation library needed).
 */
export function CountUp({ value, locale, suffix = "", prefix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const fmt = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE");

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || value < 10 || document.documentElement.dataset.lite === "1") return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.boundingClientRect.top < 0) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 600);
        setShown(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { rootMargin: "0px 0px -15% 0px" });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {fmt.format(shown)}
      {suffix}
    </span>
  );
}
