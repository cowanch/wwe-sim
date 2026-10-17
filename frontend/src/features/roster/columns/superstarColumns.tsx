import { createColumnHelper } from "@tanstack/react-table";
import type { Superstar } from "../../../types";

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
        cell: (info) => formatSpread(info.getValue()),
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
        cell: (info) => formatSpread(info.getValue()),
        size: 95,
      }),
    ],
  }),
  columnHelper.accessor((row) => row.wins / (row.wins + row.losses), {
    id: "winPercentage",
    header: "Win %",
    cell: (info) => formatWinPercentage(info.getValue()),
    size: 95,
  }),
  columnHelper.accessor("championship", { header: "Championship", size: 400 }),
];

function formatSpread(n: number) {
  return n > 0 ? `+${n}` : String(n);
}

function formatWinPercentage(n: number) {
  if (isNaN(n)) return "-";
  return `${(n * 100).toFixed(1)}%`;
}