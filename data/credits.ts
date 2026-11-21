// Licences for third-party data, fonts and (later) photos and map boundaries.
export type Credit = { name: string; by: string; licence: string; url: string };

export const dataCredits: Credit[] = [
  { name: "Registered voters per constituency, 2022", by: "IEBC", licence: "Public government record", url: "https://www.iebc.or.ke/docs/rov_per_constituency.pdf" },
  { name: "Sotik constituency profile", by: "Mzalendo Trust", licence: "Cited with attribution", url: "https://mzalendo.com/research-and-knowledge/constituencies/sotik/" },
];

// Header emblem. Public domain for copyright, but tagged "insignia" on Commons: use of official
// county insignia can be restricted by law independently of copyright, and could be read as county
// endorsement. Get written clearance (Bomet County Government) before public launch.
export const brandCredits: Credit[] = [
  { name: "Coat of arms of Bomet County", by: "Nairobi123 / Wikimedia Commons", licence: "Public domain (insignia: usage restrictions may apply)", url: "https://commons.wikimedia.org/wiki/File:Coat_of_Arms_of_Bomet_County.png" },
];

export const mapCredits: Credit[] = [
  { name: "Sotik ward and constituency boundaries", by: "IEBC, via HDX \"Kenya Elections\"; GeoJSON by tigawanna/kenya_wards_geojson_data", licence: "Public record; GeoJSON MIT; HDX licence to confirm", url: "https://data.humdata.org/dataset/kenya-elections" },
];

export const fontCredits: Credit[] = [
  { name: "Fraunces", by: "Undercase Type", licence: "SIL Open Font License 1.1", url: "https://fonts.google.com/specimen/Fraunces" },
  { name: "Inter", by: "Rasmus Andersson", licence: "SIL Open Font License 1.1", url: "https://fonts.google.com/specimen/Inter" },
  { name: "IBM Plex Mono", by: "IBM", licence: "SIL Open Font License 1.1", url: "https://fonts.google.com/specimen/IBM+Plex+Mono" },
];
