import { createColumnHelper } from "@tanstack/react-table";
import type { Competitor } from "@/types";
import type { BrandTitle } from "@/features/roster/types";
import { hideZero } from "@/utils/format";
import { createCompetitorColumns } from "./competitorColumns";

const BRAND_AREA_WIDTH = 350;
const OTHER_WIDTH = 225;

export function getBaseColumns<T extends Competitor>() {
  const c = createCompetitorColumns<T>();
  return [
    c.name,
    c.overall,
    c.rank,
    c.con,
    c.elim,
    c.totalWinLoss,
    c.ppvWinLoss,
    c.winPercentage,
    c.championship,
  ];
}

export function createSectionTitleColumns<T extends Competitor>(
  brandTitles: BrandTitle[]
) {
  const helper = createColumnHelper<T>();
  const brandIds = new Set(brandTitles.map((t) => String(t.championshipId)));

  return helper.group({
    id: "titleHistory",
    header: "Title History",
    columns: [
      ...brandTitles.map((t) =>
        helper.accessor((row) => row.reigns[t.championshipId] ?? 0, {
          id: `title-${t.championshipId}`,
          header: t.label,
          size: BRAND_AREA_WIDTH / brandTitles.length,
          cell: (info) => hideZero(info.getValue()),
        })
      ),
      helper.accessor(
        (row) =>
          Object.entries(row.reigns)
            .filter(([id]) => !brandIds.has(id))
            .reduce((sum, [, count]) => sum + count, 0),
        {
          id: "titleOther",
          header: "Other",
          size: OTHER_WIDTH,
          cell: (info) => (
            <ul className="title-list">
              <li>WWE x1</li>
              <li>SmackDown Women's x2</li>
              <li>NXT x2</li>
            </ul>
          )
        }
      ),
    ],
  });
}
