import { tokens } from "@/lib/tokens";

// Sequential green ramp for registered voters per ward, interpolated from the design tokens
// (mist → primary). Each step picks whichever text colour (ink or paper) has more contrast;
// tests/map.test.ts checks every step meets WCAG AA.
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (c: number[]) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const mix = (a: string, b: string, t: number) => toHex(hex(a).map((v, i) => v + (hex(b)[i] - v) * t));
const lum = (h: string) => {
  const c = hex(h).map((v) => v / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const contrast = (a: string, b: string) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
const textOn = (fill: string) => (contrast(fill, tokens.ink) >= contrast(fill, tokens.paper) ? tokens.ink : tokens.paper);

// Stops skip 0.6–0.85, where neither ink nor paper text reaches 4.5:1.
const ramp = [0.08, 0.28, 0.48, 0.88, 1].map((t) => mix(tokens.mist, tokens.primary, t));

export function shadeFor(value: number, min: number, max: number) {
  const i = max === min ? ramp.length - 1 : Math.round(((value - min) / (max - min)) * (ramp.length - 1));
  return { fill: ramp[i], text: textOn(ramp[i]) };
}

/** Selected ward: the gold accent with ink text. */
export const SELECTED = { fill: tokens.accent, text: tokens.ink };

export const legendRamp = ramp;
