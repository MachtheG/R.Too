// Biography timeline. Entries without `sourceIds` render as [[TO CONFIRM]].
export type TimelineEntry = { year: string; text: { en: string; sw: string }; sourceIds: string[] };

export const timeline: TimelineEntry[] = [
  { year: "—", text: { en: "[[TO CONFIRM: education]]", sw: "[[TO CONFIRM: elimu]]" }, sourceIds: [] },
  { year: "—", text: { en: "[[TO CONFIRM: career milestones]]", sw: "[[TO CONFIRM: hatua za kikazi]]" }, sourceIds: [] },
  { year: "—", text: { en: "[[TO CONFIRM: basis of the title \"Hon.\"]]", sw: "[[TO CONFIRM: msingi wa cheo \"Mhe.\"]]" }, sourceIds: [] },
  { year: "2027", text: { en: "Candidate for Member of Parliament, Sotik (UDA)", sw: "Mgombea Ubunge, Sotik (UDA)" }, sourceIds: [] },
];
