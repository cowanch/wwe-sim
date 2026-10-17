import { createColumnHelper } from "@tanstack/react-table";
import type { Championship, Superstar } from "../../../types";
import { hideZero, shortTitleName, spread, winPercentage } from "../../../utils/format";

const columnHelper = createColumnHelper<Superstar>();

export const baseColumns = [
  columnHelper.accessor("name", { header: "Name", size: 300 }),
  columnHelper.accessor("overall", { header: "Overall", size: 95 }),
  columnHelper.accessor("rank", { header: "Rank", size: 95 }),
  columnHelper.group({
    header: "Total",
    columns: [
      columnHelper.accessor("wins", { header: "Wins", size: 95 }),
      columnHelper.accessor("losses", { header: "Losses", size: 95 }),
      columnHelper.accessor((row) => row.wins - row.losses, {
        id: "spread",
        header: "Spread",
        cell: (info) => spread(info.getValue()),
        size: 95,
      }),
    ],
  }),
  columnHelper.group({
    header: "PPV",
    columns: [
      columnHelper.accessor("ppvWins", { header: "Wins", size: 95 }),
      columnHelper.accessor("ppvLosses", { header: "Losses", size: 95 }),
      columnHelper.accessor((row) => row.ppvWins - row.ppvLosses, {
        id: "ppvSpread",
        header: "Spread",
        cell: (info) => spread(info.getValue()),
        size: 95,
      }),
    ],
  }),
  columnHelper.accessor((row) => row.wins / (row.wins + row.losses), {
    id: "winPercentage",
    header: "Win %",
    cell: (info) => winPercentage(info.getValue()),
    size: 95,
  }),
  columnHelper.accessor("championship", { header: "Championship", size: 400 }),
];

export function buildTitleColumns(championships: Championship[]) {
  return columnHelper.group({
		header: "Title History",
		columns: championships.map((c) => 
			columnHelper.accessor((row) => row.titleHistory[c.id] ?? 0, {
				id: `title-${c.id}`,
				header: shortTitleName(c.name),
				size: 175,
				cell: (info) => hideZero(info.getValue()),
			})
		),
	});
}
