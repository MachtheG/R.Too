# Creative Direction: "Sura Mpya kwa Sotik"

## Concept: *The Sotik Ledger*
The site is laid out like a broadsheet data desk reporting on its own constituency. Every claim is a number, every number carries a footnote, and the candidate is the reporter who shows his working. The message is a new chapter written in evidence, not slogans. It fits a first-time candidate with no record to defend: he earns trust through transparency.

## Signature motifs
1. **Tea rows.** Fine parallel diagonal rules, drawn from the terraced tea of the Sotik hills. They serve as section dividers, chart gridlines and the texture behind the hero.
2. **Chapter numbering.** Every section opens with a large serif numeral ("01 — Who", "02 — The ground", "03 — What's next"), playing on *Sura Mpya* (new chapter).
3. **Footnote chips.** Every stat carries a small superscript marker that opens its source. This is the visible proof of the "no invented facts" rule.
4. **The five wards.** A simplified five-ward glyph of Sotik works as a logo mark, the map, and the navigation for the ward pages.

## Palette
| Token | Hex | Use |
|---|---|---|
| `--tea` | #1F3D2B | Primary: headings, hero overlay, footer |
| `--leaf` | #3E6B4A | Secondary: chart series, links |
| `--laterite` | #A4472C | Data emphasis: highlighted bars, map high values |
| `--mist` | #F4F1EA | Page background (paper) |
| `--ink` | #16181A | Body text |
| `--rule` | #D6D0C2 | Hairlines and grid |
| `--uda` | #F2C200 | **Accent only**: countdown pill, primary CTA, one highlight per screen |

Dark mode inverts to tea-black paper (#0F1A13) with mist text. Contrast reaches AA or better, and yellow never carries text without ink on top.

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
