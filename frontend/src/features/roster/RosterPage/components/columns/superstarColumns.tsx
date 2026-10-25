import type { Championship, Gender, Superstar } from "@/types";
import { createCompetitorColumns } from "./competitorColumns";

const c = createCompetitorColumns<Superstar>();

export const baseColumns = [
  c.name,
  c.overall,
  c.rank,
  c.totalWinLoss,
  c.ppvWinLoss,
  c.winPercentage,
  c.championship,
];

export function buildSuperstarTitleColumns(gender: Gender) {
  // TODO: replace this with a call to get championships for a division from server
  const championships: Championship[] = gender === "M"
    ? [
      { id: "wwe", name: "WWE Championship" },
      { id: "universal", name: "Universal Championship" },
      { id: "nxt", name: "NXT Championship" },
      { id: "intercontinental", name: "Intercontinental Championship" },
      { id: "unitedStates", name: "United States Championship" },
    ]
    : [
      { id: "rawWomens", name: "RAW Women's Championship" },
      { id: "smackdownWomens", name: "SmackDown Women's Championship" },
      { id: "nxtWomens", name: "NXT Women's Championship" },
    ];
  return c.buildTitleColumns(championships);
}
