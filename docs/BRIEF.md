# Campaign Website Brief: Hon. Robert Too, Sotik 2027

_Phase 1 interview, recorded 2026-11-19. Status: **awaiting approval**._

## Quick-search findings (to verify in Phase 2)
- Sitting Sotik MP: Francis Sigei (UDA), elected in 2022. Source: The Standard, "Former PC Francis Sigei wins MP seat after losing three times" (standardmedia.co.ke/article/2001453450).
- No public record yet found for "Hon. Robert Too". [[TO CONFIRM: what the "Hon." title refers to (former office, if any)]]
- Election date: Tue 10 Aug 2027, IEBC gazette notice of 14 Sep 2026 (Capital FM, Citizen Digital). The campaign period runs 29 May – 7 Aug 2027 and party primaries close by 9 May 2027. A Malindi High Court ruling on the date is suspended until after the election.

## Round 1: The race
| Item | Answer |
|---|---|
| Office | Member of Parliament, Sotik Constituency, Bomet County |
| Status | First-time candidate (no previous result for this seat) |
| Party | UDA. Own palette with a restrained UDA accent. |
| Countdown | 10 August 2027 |

## Round 2: The story
| Item | Answer |
|---|---|
| Theme | New energy: "A New Chapter for Sotik" / "Sura Mpya kwa Sotik" |
| Tone | Data-driven & modern |
| Priority groups | Farmers (tea, dairy); Women |
| Top 3 promises | To be drafted from research (KNBS, CIDP, sourced needs) and labelled **DRAFT** until the campaign approves them |

## Round 3: Look & feel
| Item | Answer |
|---|---|
| Visual direction | Editorial data-journal: serif headlines, fine rules, charts as heroes, documentary portrait crops |
| Colours | Landscape palette (deep tea green, red-earth laterite, mist white) with UDA yellow as the only accent |
| Languages | English + Kiswahili |
| References | None. Designer's judgement. |

## Round 4: Features & delivery
| Item | Answer |
|---|---|
| Election map | **Voter registration by ward** (IEBC), not results. No projections or polls. |
| Must-haves | Volunteer + pledge (DPA 2019), WhatsApp channel, Q&A, Ward pages (one per Sotik ward) |
| Photos | Official channels, used with permission. [[TO CONFIRM: links to the candidate's official Facebook / X / Instagram, and written permission]] |
| Delivery | **Public** GitHub repo `R.Too` + Vercel preview |
| Avoid | [[TO CONFIRM: topics, people, colours or claims to avoid]] |

## Implications for scope
- **Record / Projects tabs:** He has held no MP office, so NG-CDF projects belong to the sitting MP and must not be credited to him. These tabs will cover his documented career, community work and track record, and every item needs a document. Sotik context stats (KNBS 2019, IEBC registration) still apply.
- **Map:** Titled "Sotik's voters, ward by ward" (not "Where we led"). It is coloured by registered voters, with a sourced needs/context overlay and an accessible table.
- **Opponents:** He will likely face the sitting UDA MP in the primary. Opponents are never named or attacked.
- **Public repo:** Never commit .env files, form submissions or personal data. Form adapters read secrets only from Vercel env vars.
