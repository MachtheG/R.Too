# Creative Direction: "Sura Mpya kwa Sotik"

## Concept: *The Sotik Ledger*
The site is laid out like a broadsheet data desk reporting on its own constituency. Every claim is a number, every number carries a footnote, and the candidate is the reporter who shows his working. The message is a new chapter written in evidence, not slogans. It fits a first-time candidate with no record to defend: he earns trust through transparency.

## Signature motifs
1. **Tea rows.** Fine parallel diagonal rules, drawn from the terraced tea of the Sotik hills. They serve as section dividers, chart gridlines and the texture behind the hero.
2. **Chapter numbering.** Every section opens with a large serif numeral ("01 â€” Who", "02 â€” The ground", "03 â€” What's next"), playing on *Sura Mpya* (new chapter).
3. **Footnote chips.** Every stat carries a small superscript marker that opens its source. This is the visible proof of the "no invented facts" rule.
4. **The five wards.** A simplified five-ward glyph of Sotik works as a logo mark, the map, and the navigation for the ward pages.

## Palette

Revised 2026-11-25: **Preset A "Civic Green"** (presets.md), replacing the white/black/yellow scheme. Tokens live only in `src/app/globals.css` (:root); `src/lib/tokens.ts` mirrors them for the OG image and map, and `tests/tokens.test.ts` keeps the two in sync.

| Token | Hex | Use |
|---|---|---|
| `--ink` | #0C3320 | Headings and body text |
| `--primary` | #0B6E3A | Utility bar, links, active states, CTA band |
| `--leaf` | #1C8C4E | Hover, secondary green |
| `--accent` | #D4A62A | The one loud CTA (Join / Get involved) and kicker rules. Fill only, ink text on it |
| `--accent-deep` | #C8961E | Accent hover |
| `--mist` | #F1F4EF | Hero and alternate sections |
| `--gold-soft` | #F7EFD8 | Draft notice band |
| `--paper` | #FFFFFF | Base background |
| `--muted` | #4B5B52 | Secondary text |
| `--rule` | #E3E8E1 | Dividers and borders |

Type: Outfit (H1 700, H2/H3 600, tracking âˆ’1%) + Inter (body 17px; labels 12px/600 uppercase, +0.1em). Shapes: 6px buttons, 8px cards and photos, soft photo shadow. Map: green ramp interpolated from mistâ†’primary (stops chosen for AA labels); selected ward in gold.

## Type
- Superseded by Preset A: Outfit (headings) + Inter (body, tabular figures for stats). See Palette above.

## Motion
Motion is restrained and choreographed. Stats count up once on entering view (600ms, ease-out). Charts draw their lines left to right, and tea-row rules wipe in. There is no parallax or looping animation. `prefers-reduced-motion` turns all of it off, and lite mode does too, also dropping the map and AVIF hero.

## Photography treatment
Documentary, natural light, with the candidate among farmers and women's groups and never posed alone on a stage. He gets portrait crops at 4:5. A subtle tea-green duotone applies only to backgrounds, and portraits keep their true colour. **Until real photos arrive:** designed placeholders show a tea-row texture, a ward label and the shot description, with no faces.

## Voice
Plain, numerate and confident. Short sentences. English and Kiswahili carry equal weight. Never attack anyone.
