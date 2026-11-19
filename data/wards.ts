// Sotik's five wards and 2022 registered voters.
// Ward figures are secondary (Mzalendo, matching Wikipedia); their sum equals the
// verified IEBC constituency total. Status: [[TO CONFIRM]] until we have the IEBC ward register.
export type Ward = { slug: string; name: string; voters2022: number };

export const WARD_SOURCE_IDS = ["mzalendo-sotik", "wikipedia-sotik"];
export const WARDS_VERIFIED = false;

export const wards: Ward[] = [
  { slug: "kapletundo", name: "Kapletundo", voters2022: 20992 },
  { slug: "chemagel", name: "Chemagel", voters2022: 18870 },
  { slug: "kipsonoi", name: "Kipsonoi", voters2022: 17736 },
  { slug: "ndanai-abosi", name: "Ndanai/Abosi", voters2022: 17049 },
  { slug: "rongena-manaret", name: "Rongena/Manaret", voters2022: 12034 },
];

export const totalWardVoters = wards.reduce((n, w) => n + w.voters2022, 0);
