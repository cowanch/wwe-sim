import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { createCompetitorColumns } from "./competitorColumns";
import type { Championship, TagTeam } from "@/types";

const c = createCompetitorColumns<TagTeam>();
const helper = createColumnHelper<TagTeam>();

export const baseColumns: ColumnDef<TagTeam, any>[] = [
  c.name,
  helper.accessor("members", {
    header: "Members",
    enableSorting: false,
    meta: { className: "split-cell" },
    size: 300,
    cell: (info) => (
      <div className="split">
        {info.getValue().map((m: TagTeam) => (
          <div key={m.id} className="split__item">
            {m.name}
          </div>
        ))}
      </div>
    ),
  }),
  c.overall,
  c.rank,
  c.totalWinLoss,
  c.ppvWinLoss,
  c.winPercentage,
  c.championship,
];

export function buildTagTeamTitleColumns() {
  // TODO: replace this with a call to get championships for a division from server
  const championships: Championship[] = [
    { id: "rawTagTeam", name: "RAW Tag Team Championship" },
    { id: "smackdownTagTeam", name: "SmackDown Tag Team Championship" },
    { id: "nxtTagTeam", name: "NXT Tag Team Championship" },
  ];
  return c.buildTitleColumns(championships);
}
