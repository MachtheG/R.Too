# Progress

- [x] Phase 1: Interview → docs/BRIEF.md
- [x] Phase 2: Research → docs/RESEARCH-SUMMARY.md, data/sources.ts
- [x] Phase 3: Creative direction + design canvas (Hero A chosen)
- [x] Phase 4: Scaffold, design system, layout shell, /styleguide, quality gate, CI
- [x] Phase 5: Home (Hero A)
- [x] Phase 6: Record, Projects, Map, Plan, other tabs, ward pages
- [x] Phase 7: Forms, OG cards, SEO, a11y, Lighthouse, subagents (fact-checker + design-critic run and fixed)
- [x] Phase 8: README, secrets scan, GitHub push

## [[TO CONFIRM]] items
- The "Hon." title: office, nominating body, year, gazette ref
- Biography, education, career, honours (no public record found)
- Official social accounts and photos (unrelated namesakes exist online)
- Ward-level 2022 registered voters (secondary sources only; the IEBC ward PDF is needed)
- Population 227,855 and area 544 km² (need a direct read of KNBS Vol. II)
- Sotik household count
- WhatsApp channel link, contact email, "authorised by" name
- Kiswahili copy needs review by a native speaker
- Official campaign-period dates (cite the IEBC Gazette notice; the Capital FM source covers only the election date)
- Candidacy documentation: UDA nomination or campaign letter (UDA affiliation is shown on the site)
- Women's-enterprise pledge needs a sourced statistic
- Things to avoid: the campaign to review the draft promises
- Header emblem is the Bomet County coat of arms (Commons, public domain but tagged "insignia"). Get written clearance from Bomet County Government before launch: official insignia on a candidate's site can read as county endorsement.
- SAMPLE IMAGES: every photo marked "Sample image" is a Commons stand-in (Bomet/Kenya scenes, none of Robert Too; people shown have not endorsed him). Replace all before public launch. Currently served from Wikimedia's CDN; save local copies under public/images/ when the network isn't rate-limited.
- Ward draft plans (data/wardPlans.ts) are written by the site team, not the candidate: campaign to approve, then test at ward forums.
- Ward map geometry: IEBC boundaries via HDX "Kenya Elections" (GeoJSON MIT). Confirm the HDX dataset licence. Ward areas sum to ~485 km² vs 544 km² cited (KNBS), both to confirm.
- Authorising agent's name for the footer line (currently neutral copy: "authorising agent will be named here before launch")
- Hero portrait + all candidate photos: set file/credit/licence/sourceUrl in data/photos.ts
- Landscape photo is hotlinked from Wikimedia Commons (CC BY-SA 4.0, Timmbau); self-host it at public/images/landscape/sotik-tea-plantation.jpg
- Set NEXT_PUBLIC_SITE_URL=https://r-too.vercel.app in Vercel (canonical domain; robert-too-sotik.vercel.app retired)

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

## Phase 7 notes
- Forms: volunteer, pledge, contact. Zod validation (Kenyan mobile), unticked consent stating the purpose, honeypot; stored with purpose + consent time. Adapter via FORM_ADAPTER (console / resend / supabase).
- SEO: canonical + hreflang (en-KE, sw-KE, x-default), sitemap.xml, robots.txt, JSON-LD Person, per-locale OG share cards.
- Lighthouse mobile (local `next start`): Accessibility 100, Best Practices 100, SEO 100 when NEXT_PUBLIC_SITE_URL matches the domain (92 locally only because the canonical points at production). Performance 91–96 across pages, median ~94: slightly under the 95 target locally; re-measure on Vercel.
- Fact-checker verified the 2022 register, ward figures, growth, tea prices and EN/SW parity, and found no blockers. Fixed: unsupported "Hon." in JSON-LD removed; campaign-period dates and "polls open 6am" removed or marked; "gazette notice" corrected to "IEBC public notice"; ward count re-sourced; 2017 register (73,314) now verified against the IEBC PDF.
- Design-critic fixes: dark-mode laterite text token (6.8:1), yellow focus ring on dark surfaces, yellow rationed (CTA band to tea, calendar button outlined, footer note in mist), 44px+ buttons, form borders ≥5:1, styled to-confirm chip, map tile edges.

## 2026-11-25: Preset A restyle + campaign photos
- Restyled to Preset A "Civic Green" (presets.md): tokens in globals.css only; Outfit + Inter; utility bar, boxed nav, gold CTA, draft band, split hero, cards, grouped footer.
- Campaign photos (public/images/portrait): two portraits (hero, Story, Home card) and two posters + one billboard mock-up (Gallery, uncropped). Credited "Robert Too campaign": CONFIRM photographer. WhatsApp-compressed: request originals.
- NOT published: the "CONFIRMED INCOMING MP" poster (claims an unheld election is won). Kept locally in /.unused-assets (git-ignored).
- The posters say "Hon Robert Too": the "Hon." title is still TO CONFIRM. Remove those posters from data/photos.ts if the title can't be supported.
- Run tests from PowerShell, not Git Bash: drive-letter casing (C:/ vs c:\) loads vitest twice and every suite fails with "reading 'config'".
