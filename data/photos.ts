// Photo manifest. `npm run images` registers files dropped into public/images/<category>/
// and writes derived sizes to public/images/_generated/.
// Slots with `file: null` render as designed placeholders (see docs/SHOT-LIST.md).
export const photoCategories = ["portrait", "community", "farmers", "women", "events", "landscape"] as const;
export type PhotoCategory = (typeof photoCategories)[number];

export type Photo = {
  id: string;
  file: string | null; // path under public/images, or null for an unfilled slot
  alt: { en: string; sw: string };
  caption: { en: string; sw: string };
  date?: string;
  ward?: string;
  category: PhotoCategory;
  projectSlug?: string;
  credit?: string;
  licence?: string;
  sourceUrl?: string;
  approvedForPress: boolean;
  featured: boolean;
  ratio: "4/5" | "3/2" | "16/9" | "1/1";
};

const slot = (id: string, category: PhotoCategory, ratio: Photo["ratio"], en: string, sw: string, featured = false): Photo => ({
  id, file: null, category, ratio, featured, approvedForPress: false,
  alt: { en, sw }, caption: { en, sw },
});

export const photos: Photo[] = [
  slot("hero-portrait", "portrait", "4/5", "Robert Too among tea farmers", "Robert Too pamoja na wakulima wa chai", true),
  slot("story-home", "portrait", "4/5", "Robert Too at home in Sotik", "Robert Too nyumbani Sotik"),
  slot("story-family", "community", "3/2", "Robert Too with community elders", "Robert Too na wazee wa jamii"),
  slot("tea-buying-centre", "farmers", "3/2", "Robert Too at a tea buying centre", "Robert Too kwenye kituo cha kununua chai", true),
  slot("dairy-farmers", "farmers", "3/2", "Robert Too with dairy farmers", "Robert Too na wafugaji wa ng'ombe wa maziwa"),
  slot("women-group", "women", "3/2", "Robert Too at a women's group meeting", "Robert Too kwenye mkutano wa kikundi cha wanawake", true),
  slot("town-hall", "events", "16/9", "Robert Too addressing a town hall", "Robert Too akihutubia mkutano"),
  slot("sotik-hills", "landscape", "16/9", "Tea terraces in the Sotik hills", "Mashamba ya chai milimani Sotik"),
];

export const photoById = (id: string) => photos.find((p) => p.id === id);
