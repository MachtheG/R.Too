// Mirror of the :root colour tokens in src/app/globals.css, for places that cannot read CSS
// variables (the OG image renderer, SVG fills computed in JS). globals.css is the source of
// truth; tests/tokens.test.ts fails if these drift from it.
export const tokens = {
  ink: "#0c3320",
  primary: "#0b6e3a",
  leaf: "#1c8c4e",
  accent: "#d4a62a",
  "accent-deep": "#c8961e",
  mist: "#f1f4ef",
  "gold-soft": "#f7efd8",
  paper: "#ffffff",
  muted: "#4b5b52",
  rule: "#e3e8e1",
} as const;
