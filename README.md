# Robert Too · Sotik 2027

Campaign website for **Robert Too, candidate for Member of Parliament, Sotik Constituency (Bomet County)**, General Election **10 August 2027**. English and Kiswahili. Every figure is footnoted to a source.

> **Status: concept demo.** It is not yet approved by the candidate. Items marked `[[TO CONFIRM]]` are listed in [PROGRESS.md](PROGRESS.md).

## Stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components, `proxy.ts`), React 19, TypeScript strict |
| Styling | Tailwind CSS 4 with design tokens in `src/app/globals.css`, shadcn/ui (Base UI) |
| i18n | next-intl 4 with `next/root-params`; routes `/en/...` and `/sw/...` |
| Forms | React Hook Form + Zod, server action, pluggable adapters (console / Resend / Supabase) |
| Images | `next/image` plus a sharp pipeline (`npm run images`) |
| Tests | Vitest (unit), Playwright (e2e and screenshots), GitHub Actions CI |

## Quick start

```bash
npm ci
cp .env.example .env.local   # optional locally; the console adapter is the default
npm run dev                  # http://localhost:3000 → redirects to /en
```

| Command | What it does |
|---|---|
| `npm run gate` | lint → typecheck → unit tests → source check → translation check → build (this is what CI runs) |
| `npm run e2e` | Playwright end-to-end tests (run `npm run build` first) |
| `npm run screenshots -- http://localhost:3000 <label>` | full-page screenshots at 375 / 768 / 1440 into `docs/screenshots/<label>/` |
| `npm run images` | process new photos (see below) |
| `npm run check:sources` | every `sourceId` used in code exists in `data/sources.ts`, and every source is complete |
| `npm run check:i18n` | EN and SW message files have identical keys and no empty strings |

## Folder map

```
data/                    ← all facts live here (edit these, not components)
  sources.ts             every source: title, publisher, date, URL, primary?, verified?
  stats.ts  wards.ts     headline numbers and ward voter figures
  projects.ts            the projects ledger (empty until documents arrive)
  timeline.ts plan.ts news.ts photos.ts credits.ts
messages/<en|sw>/<tab>.json   one translation file per tab
src/app/[locale]/<tab>/page.tsx   one folder per tab
src/components/<tab>/    one component folder per tab (~200 lines max per file)
src/components/shared/   PageHeader, Container, FootnoteMark, ToConfirm, PhotoPlaceholder, PhotoFigure
src/lib/forms/           schemas, submit logic, adapters, server action
scripts/                 check-sources, check-i18n, images, screenshots
docs/                    BRIEF, RESEARCH-SUMMARY, CREATIVE-DIRECTION, SHOT-LIST, screenshots
.claude/agents/          fact-checker and design-critic review agents
```

## How to…

### Add a source
Add an entry to `data/sources.ts`. Set `primary: true` only for official documents (IEBC, Kenya Gazette, KNBS, NG-CDF, Hansard), and `verified: true` only after you have checked the exact figure in the document. Reference it from data with `sourceId: "<id>"` or `sourceIds: [...]`. `npm run check:sources` fails on unknown ids.

### Add a project
Add an object to `projects` in `data/projects.ts`. Rules, which the fact-checker agent enforces:
- `sourceIds` must point to a real document. No document means the project stays out.
- `role` says what he did: sponsored, lobbied, allocated, oversaw, delivered, founded, led or supported. Never "built" unless the source says so.
- `amount.kind` is `"approved"` (an allocation) or `"spent"`. These are never mixed.

The Projects table, filters, Record charts, ward pages, map overlay, sitemap and detail page `/projects/<slug>` all update automatically.

### Add photos
1. Drop originals into `public/images/<category>/`. Categories: portrait, community, farmers, women, events, landscape.
2. Run `npm run images`. It writes AVIF/WebP at 640/1280/1920px plus blur placeholders, and lists any files not yet registered.
3. In `data/photos.ts`, set the slot's `file` (e.g. `"portrait/hero.jpg"`), alt text and caption in **both** languages, `credit`, `licence` and `approvedForPress`.

[docs/SHOT-LIST.md](docs/SHOT-LIST.md) lists every slot with its ratio and minimum size. **Never use AI-generated images of the candidate or any real person.**

### Add election results
Results go in `data/election/results-<year>.ts`, with a source for **each** figure: IEBC Forms 35A/35B, Kenya Gazette. Robert is a first-time candidate, so the map currently shows registered voters by ward. Never add estimates, projections or polls.

### Edit translations
Edit `messages/en/<tab>.json` and `messages/sw/<tab>.json` together, keeping the same keys. `npm run check:i18n` catches drift. The Kiswahili needs a native speaker's review before launch.

### Forms and data protection
Forms collect name, phone, optional email and ward. Each has an **unticked** consent box that states the purpose, and links to `/privacy` (Kenya Data Protection Act 2019). Submissions are stored with the purpose and the consent time; the consent box value itself is not stored. Choose where submissions go with `FORM_ADAPTER`:

| `FORM_ADAPTER` | Needs | Notes |
|---|---|---|
| `console` (default) | nothing | dev only: logs a redacted summary |
| `resend` | `RESEND_API_KEY`, `FORM_TO_EMAIL`, `FORM_FROM_EMAIL` | emails each submission to the campaign |
| `supabase` | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | inserts into a `submissions` table (SQL in `src/lib/forms/adapters/supabase.ts`) |

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) → **Import Git Repository** → pick this repo. Vercel detects Next.js; keep the defaults (build `next build`, Node 22).
2. **Environment Variables** (Production and Preview):
   - `NEXT_PUBLIC_SITE_URL` = the final domain, e.g. `https://robert-too.co.ke`. It is used for canonical URLs, the sitemap, share links and OG images.
   - `FORM_ADAPTER` = `resend` or `supabase`, plus that adapter's keys. Without them, forms only log to the server console.
3. Deploy. Then open `/en`, `/sw`, `/sitemap.xml` and submit a test form.
4. Custom domain: Project → Settings → Domains. Then update `NEXT_PUBLIC_SITE_URL` and redeploy.

## Rules this project follows
No invented facts · every figure sourced · unverified figures visibly marked · official election data only · no attacks on named opponents · Data Protection Act 2019 compliant forms · WCAG 2.2 AA · works on a 375px phone and in lite mode.
