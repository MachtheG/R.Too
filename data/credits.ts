// Licences for third-party data, fonts and (later) photos and map boundaries.
export type Credit = { name: string; by: string; licence: string; url: string };

export const dataCredits: Credit[] = [
  { name: "Registered voters per constituency, 2022", by: "IEBC", licence: "Public government record", url: "https://www.iebc.or.ke/docs/rov_per_constituency.pdf" },
  { name: "Sotik constituency profile", by: "Mzalendo Trust", licence: "Cited with attribution", url: "https://mzalendo.com/research-and-knowledge/constituencies/sotik/" },
];

export const fontCredits: Credit[] = [
  { name: "Fraunces", by: "Undercase Type", licence: "SIL Open Font License 1.1", url: "https://fonts.google.com/specimen/Fraunces" },
  { name: "Inter", by: "Rasmus Andersson", licence: "SIL Open Font License 1.1", url: "https://fonts.google.com/specimen/Inter" },
  { name: "IBM Plex Mono", by: "IBM", licence: "SIL Open Font License 1.1", url: "https://fonts.google.com/specimen/IBM+Plex+Mono" },
];

// Map boundaries: none yet. The map is a schematic until openly licensed ward GeoJSON is confirmed.
export const mapCredits: Credit[] = [];
