"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type Props = { value: number; locale: string; suffix?: string; prefix?: string };

/** Renders the final value on the server; counts up once when scrolled into view. */
export function CountUp({ value, locale, suffix = "", prefix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const fmt = new Intl.NumberFormat(locale === "sw" ? "sw-KE" : "en-KE");

  useEffect(() => {
    if (!inView || reduce || value < 10) return;
    const controls = animate(0, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {prefix}
      {fmt.format(shown)}
      {suffix}
    </span>
  );
}
