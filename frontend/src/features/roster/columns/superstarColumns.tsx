import { createColumnHelper } from "@tanstack/react-table";
import type { Superstar } from "../../../types";

const columnHelper = createColumnHelper<Superstar>();

export const baseColumns = [
  columnHelper.accessor("name", { header: "Name" }),
  columnHelper.accessor("overall", { header: "Overall" }),
  columnHelper.accessor("rank", { header: "Rank" }),
  columnHelper.group({
    header: "Total",
    columns: [
      columnHelper.accessor("wins", { header: "Wins" }),
      columnHelper.accessor("losses", { header: "Losses" }),
      columnHelper.accessor((row) => row.wins - row.losses, {
        id: "spread",
        header: "Spread",
        cell: (info) => formatSpread(info.getValue()),
      }),
    ],
  }),
  columnHelper.group({
    header: "PPV",
    columns: [
      columnHelper.accessor("ppvWins", { header: "Wins" }),
      columnHelper.accessor("ppvLosses", { header: "Losses" }),
      columnHelper.accessor((row) => row.ppvWins - row.ppvLosses, {
        id: "ppvSpread",
        header: "Spread",
        cell: (info) => formatSpread(info.getValue()),
      }),
    ],
  }),
  columnHelper.accessor((row) => row.wins / (row.wins + row.losses), {
    id: "winPercentage",
    header: "Win %",
    cell: (info) => formatWinPercentage(info.getValue()),
  }),
  columnHelper.accessor("championship", { header: "Championship" }),
];

function formatSpread(n: number) {
  return n > 0 ? `+${n}` : String(n);
}

function formatWinPercentage(n: number) {
  if (isNaN(n)) return "-";
  return `${(n * 100).toFixed(1)}%`;
}