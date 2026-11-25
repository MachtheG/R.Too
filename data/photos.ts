// Photo manifest. `npm run images` registers files dropped into public/images/<category>/
// and writes derived sizes to public/images/_generated/.
//
// SAMPLE IMAGES: every entry with `sample: true` is an openly licensed stand-in from Wikimedia
// Commons. None of them shows Robert Too, and the people in them have not endorsed the campaign.
// The site labels each one "Sample image". Replace them with the campaign's own photos (and set
// sample: false) BEFORE public launch. See docs/SHOT-LIST.md for the shot each slot needs.
export const photoCategories = ["portrait", "community", "farmers", "women", "events", "landscape"] as const;
export type PhotoCategory = (typeof photoCategories)[number];

type L = { en: string; sw: string };
export type Photo = {
  id: string;
  file: string | null; // path under public/images, or null for an unfilled slot
  alt: L;
  caption: L;
  brief?: L; // what the campaign's own photo for this slot should show
  date?: string;
  ward?: string;
  category: PhotoCategory;
  projectSlug?: string;
  credit?: string;
  licence?: string;
  licenceUrl?: string;
  sourceUrl?: string; // page the photo came from (e.g. its Wikimedia Commons file page)
  sample?: boolean; // stand-in image, not of the candidate
  approvedForPress: boolean;
  featured: boolean;
  ratio: "4/5" | "3/2" | "16/9" | "1/1" | "2/3";
  focus?: string; // CSS object-position for cover crops, e.g. "50% 15%" keeps a face in frame
  fit?: "cover" | "contain"; // contain = never crop (posters with text built in)
};

const BY_SA_4 = { licence: "CC BY-SA 4.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/" };
const BY_SA_2 = { licence: "CC BY-SA 2.0", licenceUrl: "https://creativecommons.org/licenses/by-sa/2.0/" };
const BY_2 = { licence: "CC BY 2.0", licenceUrl: "https://creativecommons.org/licenses/by/2.0/" };
// Served from Wikimedia's CDN until local copies are saved under public/images/ (then use the local path).
const wm = (path: string) => `https://upload.wikimedia.org/wikipedia/commons/${path}`;
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

type SampleArgs = Omit<Photo, "file" | "sample" | "approvedForPress" | "featured"> & { file: string; featured?: boolean };
const sample = (p: SampleArgs): Photo => ({ featured: false, ...p, sample: true, approvedForPress: false });

// Campaign's own photos (supplied 2026-11-25 as WhatsApp copies; request originals for sharper large sizes).
const CAMPAIGN = { credit: "Robert Too campaign", approvedForPress: false } as const; // CONFIRM: photographer name
type CampaignArgs = Omit<Photo, "approvedForPress" | "featured" | "credit"> & { featured?: boolean };
const own = (p: CampaignArgs): Photo => ({ featured: false, ...CAMPAIGN, ...p });

export const photos: Photo[] = [
  own({
    id: "hero-portrait", category: "portrait", ratio: "4/5", featured: true,
    file: "portrait/robert-too-portrait-lapel.jpg", focus: "50% 18%",
    alt: { en: "Robert Too in a dark double-breasted suit, standing by a window overlooking green hills", sw: "Robert Too akiwa amevaa suti nyeusi, amesimama dirishani akitazama milima ya kijani" },
    caption: { en: "Robert Too.", sw: "Robert Too." },
  }),
  own({
    id: "story-home", category: "portrait", ratio: "4/5",
    file: "portrait/robert-too-portrait-window.jpg", focus: "50% 18%",
    alt: { en: "Robert Too in a dark suit and white shirt, wearing a Kenyan-flag beaded bracelet, standing by a window", sw: "Robert Too akiwa amevaa suti nyeusi na shati jeupe, na bangili ya shanga ya bendera ya Kenya, amesimama dirishani" },
    caption: { en: "Robert Too.", sw: "Robert Too." },
  }),
  own({
    id: "poster-better-future", category: "events", ratio: "2/3", fit: "contain",
    file: "portrait/poster-together-better-future.jpg",
    alt: { en: "Campaign poster: Robert Too, MP 2027, Sotik Constituency, \"Together, we build a better future\"", sw: "Bango la kampeni: Robert Too, Mbunge 2027, Eneo Bunge la Sotik" },
    caption: { en: "Campaign poster.", sw: "Bango la kampeni." },
  }),
  own({
    id: "poster-stronger-sotik", category: "events", ratio: "2/3", fit: "contain",
    file: "portrait/poster-stronger-sotik.jpg",
    alt: { en: "Campaign poster: Robert Too, MP 2027, Sotik Constituency, \"Together for a stronger Sotik\"", sw: "Bango la kampeni: Robert Too, Mbunge 2027, \"Pamoja kwa Sotik yenye nguvu\"" },
    caption: { en: "Campaign poster.", sw: "Bango la kampeni." },
  }),
  own({
    id: "billboard-design", category: "events", ratio: "2/3", fit: "contain",
    file: "portrait/billboard-design.jpg",
    alt: { en: "Billboard design mock-up: Robert Too, MP 2027, Sotik Constituency", sw: "Mfano wa muundo wa bango kubwa: Robert Too, Mbunge 2027, Sotik" },
    caption: { en: "Billboard design (mock-up).", sw: "Muundo wa bango kubwa (mfano)." },
  }),
  sample({
    id: "story-family", category: "community", ratio: "3/2",
    file: wm("d/d5/Community_meeting%2C_central_Kenya.jpg"), // local copy: public/images/samples/community-meeting.jpg,
    alt: { en: "Residents seated at an outdoor community forum in Kenya", sw: "Wakazi wameketi kwenye mkutano wa jamii nje, Kenya" },
    caption: { en: "A community forum in Murang'a, Kenya.", sw: "Mkutano wa jamii Murang'a, Kenya." },
    brief: { en: "Robert Too with family or community elders", sw: "Robert Too na familia au wazee wa jamii" },
    credit: "Judzie7 / Wikimedia Commons", ...BY_SA_4, sourceUrl: commons("Community_meeting,_central_Kenya.jpg"),
  }),
  sample({
    id: "tea-buying-centre", category: "farmers", ratio: "3/2", featured: true,
    file: wm("thumb/1/1f/KER_-_Tea_pickers_working_near_Kericho%2C_Kenya%2C_2012.jpg/1280px-KER_-_Tea_pickers_working_near_Kericho%2C_Kenya%2C_2012.jpg"), // local copy: public/images/samples/tea-pickers-kericho.jpg,
    alt: { en: "Workers hand-picking tea on a plantation", sw: "Wafanyakazi wakichuma chai kwa mkono shambani" },
    caption: { en: "Tea picking near Kericho, 2012.", sw: "Uchumaji wa chai karibu na Kericho, 2012." },
    brief: { en: "Robert Too at a tea buying centre", sw: "Robert Too kwenye kituo cha kununua chai" },
    credit: "Josep M. Gracia / Wikimedia Commons", ...BY_SA_4, sourceUrl: commons("KER_-_Tea_pickers_working_near_Kericho,_Kenya,_2012.jpg"),
  }),
  sample({
    id: "dairy-farmers", category: "farmers", ratio: "3/2",
    file: wm("thumb/3/3f/Dairy_Farming_in_Bomet%2C_Kenya.jpg/1280px-Dairy_Farming_in_Bomet%2C_Kenya.jpg"), // local copy: public/images/samples/bomet-dairy.jpg,
    alt: { en: "Dairy cattle on a smallholding in Bomet", sw: "Ng'ombe wa maziwa kwenye shamba dogo Bomet" },
    caption: { en: "Dairy farming in Bomet.", sw: "Ufugaji wa ng'ombe wa maziwa Bomet." },
    brief: { en: "Robert Too with dairy farmers", sw: "Robert Too na wafugaji wa ng'ombe wa maziwa" },
    credit: "Korirhilla / Wikimedia Commons", ...BY_SA_4, sourceUrl: commons("Dairy_Farming_in_Bomet,_Kenya.jpg"),
  }),
  sample({
    id: "women-group", category: "women", ratio: "3/2", featured: true,
    file: wm("thumb/b/b2/Self-Help_groups_meeting_with_Caritas_in_Kilimambogo.jpeg/1280px-Self-Help_groups_meeting_with_Caritas_in_Kilimambogo.jpeg"), // local copy: public/images/samples/self-help-group.jpg,
    alt: { en: "Members of a self-help group seated at a meeting", sw: "Wanachama wa kikundi cha kujisaidia wameketi kwenye mkutano" },
    caption: { en: "A self-help group meeting in Kilimambogo, Kenya.", sw: "Mkutano wa kikundi cha kujisaidia Kilimambogo, Kenya." },
    brief: { en: "Robert Too at a women's group meeting", sw: "Robert Too kwenye mkutano wa kikundi cha wanawake" },
    credit: "McKay Savage / Wikimedia Commons", ...BY_2, sourceUrl: commons("Self-Help_groups_meeting_with_Caritas_in_Kilimambogo.jpeg"),
  }),
  sample({
    id: "town-hall", category: "events", ratio: "16/9",
    file: wm("c/cc/NP_Kenya_211011_49_%286269549199%29.jpg"), // local copy: public/images/samples/village-meeting.jpg,
    alt: { en: "Villagers gathered under a tree for a community meeting", sw: "Wanakijiji wamekusanyika chini ya mti kwa mkutano wa jamii" },
    caption: { en: "A village meeting in northern Kenya, 2011.", sw: "Mkutano wa kijiji kaskazini mwa Kenya, 2011." },
    brief: { en: "Robert Too addressing a town hall", sw: "Robert Too akihutubia mkutano" },
    credit: "CIAT / Wikimedia Commons", ...BY_SA_2, sourceUrl: commons("NP_Kenya_211011_49_(6269549199).jpg"),
  }),
  sample({
    id: "project-site", category: "community", ratio: "16/9",
    file: wm("thumb/8/81/UDDT_block_under_construction_at_secondary_school_in_Nakuru_London_%28ROSA%29_%283449814868%29.jpg/1280px-UDDT_block_under_construction_at_secondary_school_in_Nakuru_London_%28ROSA%29_%283449814868%29.jpg"), // local copy: public/images/samples/school-project.jpg,
    alt: { en: "A school sanitation block under construction", sw: "Jengo la vyoo vya shule likijengwa" },
    caption: { en: "A school sanitation project under construction, Nakuru.", sw: "Mradi wa vyoo vya shule ukijengwa, Nakuru." },
    brief: { en: "Robert Too at a community project site", sw: "Robert Too kwenye eneo la mradi wa jamii" },
    credit: "SuSanA Secretariat / Wikimedia Commons", ...BY_2, sourceUrl: commons("UDDT_block_under_construction_at_secondary_school_in_Nakuru_London_(ROSA)_(3449814868).jpg"),
  }),
  sample({
    id: "bomet-plains", category: "landscape", ratio: "16/9",
    file: wm("thumb/a/af/RainbowBometcounty.jpg/1280px-RainbowBometcounty.jpg"), // local copy: public/images/samples/bomet-plains.jpg,
    alt: { en: "Open farmland under a rainbow in southern Bomet County", sw: "Mashamba wazi chini ya upinde wa mvua kusini mwa Kaunti ya Bomet" },
    caption: { en: "Farmland in southern Bomet County.", sw: "Mashamba kusini mwa Kaunti ya Bomet." },
    credit: "Aaron Better / Wikimedia Commons", ...BY_SA_4, sourceUrl: commons("RainbowBometcounty.jpg"),
  }),
  // Real Sotik photo (not a stand-in): geotagged in Sotik (-0.594, 35.029), 4 Jul 2020.
  {
    id: "sotik-hills",
    file: wm("thumb/a/a2/Tea_Plantation_in_Sotik%2C_Kenya.jpg/1920px-Tea_Plantation_in_Sotik%2C_Kenya.jpg"), // local copy: public/images/landscape/sotik-tea-plantation.jpg,
    category: "landscape",
    ratio: "16/9",
    featured: true,
    approvedForPress: false,
    alt: { en: "Rows of tea bushes on a farm in Sotik under a clear morning sky", sw: "Mistari ya michai kwenye shamba Sotik chini ya anga safi ya asubuhi" },
    caption: { en: "Tea growing in Sotik, July 2020.", sw: "Kilimo cha chai Sotik, Julai 2020." },
    date: "2020-07-04",
    credit: "Timmbau / Wikimedia Commons",
    ...BY_SA_4,
    sourceUrl: commons("Tea_Plantation_in_Sotik,_Kenya.jpg"),
  },
];

export const photoById = (id: string) => photos.find((p) => p.id === id);

/** URL for next/image: remote URLs pass through, local files resolve under /images. */
export const photoSrc = (p: Photo) => (!p.file ? null : p.file.startsWith("https://") ? p.file : `/images/${p.file}`);
