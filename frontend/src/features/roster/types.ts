import type { TitleKey } from "@/types";

export interface BrandTitle {
  championshipId: TitleKey;
  label: string;
}

export interface SectionConfig {
  id: string;
  name: string; // banner text
  brandTitles: BrandTitle[];
}
