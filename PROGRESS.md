# Progress

- [x] Phase 1: Interview → docs/BRIEF.md
- [x] Phase 2: Research → docs/RESEARCH-SUMMARY.md, data/sources.ts
- [x] Phase 3: Creative direction + design canvas (Hero A chosen)
- [x] Phase 4: Scaffold, design system, layout shell, /styleguide, quality gate, CI
- [x] Phase 5: Home (Hero A)
- [ ] Phase 6: Record, Projects, Map, Plan, other tabs, ward pages

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
