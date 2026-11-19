# Progress

- [x] Phase 1: Interview → docs/BRIEF.md
- [x] Phase 2: Research → docs/RESEARCH-SUMMARY.md, data/sources.ts
- [x] Phase 3: Creative direction + design canvas (Hero A chosen)
- [x] Phase 4: Scaffold, design system, layout shell, /styleguide, quality gate, CI
- [x] Phase 5: Home (Hero A)
- [x] Phase 6: Record, Projects, Map, Plan, other tabs, ward pages
- [ ] Phase 7: Forms, OG cards, SEO, a11y, Lighthouse, subagents

## [[TO CONFIRM]] items
- The "Hon." title: office, nominating body, year, gazette ref
- Biography, education, career, honours (no public record found)
- Official social accounts and photos (unrelated namesakes exist online)
- Ward-level 2022 registered voters (secondary sources only; the IEBC ward PDF is needed)
- 2017 registered voters (73,314; the IEBC PDF hasn't been parsed yet)
- Population 227,855 and area 544 km² (need a direct read of KNBS Vol. II)
- Sotik household count
- WhatsApp channel link, contact email, "authorised by" name
- Kiswahili copy needs review by a native speaker
- Things to avoid: the campaign to review the draft promises

## Notes
- The quality gate (lint, typecheck, tests, build) starts at Phase 4, when the scaffold exists.
- The election map has no results data, because he is a first-time candidate. It shows voter registration by ward instead (decided in the brief).
- Concept-demo disclaimer in the footer until the candidate approves the site.

## Phase 4 notes
- Stack: Next 16.4 (Cache Components, `proxy.ts`), next-intl 4.15 via `next/root-params`, Tailwind 4.3, shadcn (base-ui), Vitest, Playwright.
- Removed an unexpected `cn` npm package that shadcn added; `cn()` now uses clsx + tailwind-merge.
- Gate: `npm run gate`. Screenshots: `npm run screenshots -- <url> <phase>` → docs/screenshots/.
- Arriving with later phases: Motion usage, MapLibre, Recharts, React Hook Form, sharp image pipeline.

## Phase 6 notes
- 17 tabs + 5 ward pages, all in EN/SW. Every tab has its own messages/<locale>/<tab>.json and components/<tab>/ folder.
- Projects ledger (`data/projects.ts`) is **empty by design**: no documented initiatives yet. Filters, charts and detail pages are built and tested against fixtures; they fill in as soon as entries with documents are added.
- `/projects/_none` is a sentinel that Cache Components needs while the ledger is empty; it returns 404 and goes away automatically when the first project is added.
- Map is a schematic tile map (not geographic) until openly licensed ward GeoJSON is confirmed; MapLibre not yet installed for that reason. Projects overlay toggle is disabled while the ledger is empty.
- Charts are lightweight accessible CSS bar lists instead of Recharts: same data, no client JS, readable by screen readers.
- Photo pipeline: `npm run images` (sharp) → AVIF/WebP at 640/1280/1920 + blur placeholders in data/photos.generated.json. Shot list: docs/SHOT-LIST.md.
- Lite mode: footer toggle (auto-on with Save-Data); turns off the interactive map.
