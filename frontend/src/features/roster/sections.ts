import type { BrandTitle, SectionConfig } from "./types";

const MEN_TITLES: BrandTitle[] = [
  { championshipId: "universal", label: "Universal" },
  { championshipId: "intercontinental", label: "Intercontinental" }
];

export const RAW_SECTIONS: SectionConfig[] = [
  { id: "main-event", name: "Main Event", brandTitles: MEN_TITLES },
  { id: "mid-card", name: "Mid Card", brandTitles: MEN_TITLES },
  { id: "womens", name: "Women's", brandTitles: [{ championshipId: "rawWomens", label: "RAW Women's" }]},
  { id: "tag-team", name: "Tag Team", brandTitles: [{ championshipId: "rawTagTeam", label: "RAW Tag Team" }]},
];
