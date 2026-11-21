# Creative Direction: "Sura Mpya kwa Sotik"

## Concept: *The Sotik Ledger*
The site is laid out like a broadsheet data desk reporting on its own constituency. Every claim is a number, every number carries a footnote, and the candidate is the reporter who shows his working. The message is a new chapter written in evidence, not slogans. It fits a first-time candidate with no record to defend: he earns trust through transparency.

## Signature motifs
1. **Tea rows.** Fine parallel diagonal rules, drawn from the terraced tea of the Sotik hills. They serve as section dividers, chart gridlines and the texture behind the hero.
2. **Chapter numbering.** Every section opens with a large serif numeral ("01 — Who", "02 — The ground", "03 — What's next"), playing on *Sura Mpya* (new chapter).
3. **Footnote chips.** Every stat carries a small superscript marker that opens its source. This is the visible proof of the "no invented facts" rule.
4. **The five wards.** A simplified five-ward glyph of Sotik works as a logo mark, the map, and the navigation for the ward pages.

## Palette
Revised 2026-11-22 at the client's request: **white base, black text, yellow accents, green secondary.**

| Token | Hex | Use |
|---|---|---|
| `--mist` | #FFFFFF | Page background (main white); text on green/black |
| `--ink` | #0A0A0A | All headings and body text |
| `--uda` | #FFCC00 | **Accent**: primary buttons, countdown pill, selected ward, header/footer rule, chips. Always with black text on it |
| `--tea` | #14532D | **Secondary green**: stats/CTA bands, ward panels, outline buttons |
| `--leaf` | #1E6B3A | Green text on white (Swahili subline) |
| `--pine` | #1A6634 | Green accent text: eyebrows, hovers, focus ring (was `--laterite`) |
| `--paper-2` | #F4F5F1 | Soft panels |
| `--rule` | #E2E3DC | Hairlines and grid |
| `--night` | #0A0A0A | Footer |

Map: sequential green ramp by registered voters; selected ward in yellow. The OS dark-mode preference is not followed (the brief is a white site); an explicit `data-theme="dark"` theme remains. Contrast is AA or better everywhere, and yellow is never used as text on white.

## Type
- **Display:** Fraunces (variable serif with optical sizing) for headlines and numerals.
- **Text/UI:** Inter (tabular figures for all stats).
- **Data labels:** IBM Plex Mono, small caps, for footnotes and sources.
- Scale: 1.250 ratio. The hero headline is clamp(2.75rem → 6rem).

## Motion
Motion is restrained and choreographed. Stats count up once on entering view (600ms, ease-out). Charts draw their lines left to right, and tea-row rules wipe in. There is no parallax or looping animation. `prefers-reduced-motion` turns all of it off, and lite mode does too, also dropping the map and AVIF hero.

## Photography treatment
Documentary, natural light, with the candidate among farmers and women's groups and never posed alone on a stage. He gets portrait crops at 4:5. A subtle tea-green duotone applies only to backgrounds, and portraits keep their true colour. **Until real photos arrive:** designed placeholders show a tea-row texture, a ward label and the shot description, with no faces.

## Voice
Plain, numerate and confident. Short sentences. English and Kiswahili carry equal weight. Never attack anyone.
