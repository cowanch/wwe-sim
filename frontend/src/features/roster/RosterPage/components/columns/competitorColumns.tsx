import { createColumnHelper } from "@tanstack/react-table";
import type { Championship, Competitor } from "@/types";
import { hideZero, shortTitleName, spread, twoDecimal, winPercentage } from "@/utils/format";

export function createCompetitorColumns<T extends Competitor>() {
  const helper = createColumnHelper<T>();

  return {
    name: helper.accessor((row) => row.name, {
      id: "name",
      header: "Name",
      size: 300,
    }),

    overall: helper.accessor((row) => row.overall, {
      id: "overall",
      header: "Overall",
      size: 95,
      cell: (info) => twoDecimal(info.getValue()),
    }),

    rank: helper.accessor((row) => row.rank, {
      id: "rank",
      header: "Rank",
      size: 95,
      cell: (info) => twoDecimal(info.getValue()),
    }),

    con: helper.accessor((row) => row.con, {
      id: "con",
      header: "Con",
      size: 95,
    }),

    elim: helper.accessor((row) => row.elim, {
      id: "elim",
      header: "Elim",
      size: 95,
    }),

    totalWinLoss: helper.group({
      header: "Total",
      columns: [
        helper.accessor((row) => row.wins, { id: "wins", header: "Wins", size: 95 }),
        helper.accessor((row) => row.losses, { id: "losses", header: "Losses", size: 95 }),
        helper.accessor((row) => row.wins - row.losses, {
          id: "spread",
          header: "Spread",
          size: 95,
          cell: (info) => spread(info.getValue()),
        }),
      ],
    }),

    ppvWinLoss: helper.group({
      header: "Total",
      columns: [
        helper.accessor((row) => row.ppvWins, { id: "ppvWins", header: "Wins", size: 95 }),
        helper.accessor((row) => row.ppvLosses, { id: "ppvLosses", header: "Losses", size: 95 }),
        helper.accessor((row) => row.ppvWins - row.ppvLosses, {
          id: "ppvSpread",
          header: "Spread",
          size: 95,
          cell: (info) => spread(info.getValue()),
        }),
      ],
    }),

    winPercentage: helper.accessor((row) => row.wins / (row.wins + row.losses), {
      id: "winPercentage",
      header: "Win %",
      size: 95,
      cell: (info) => winPercentage(info.getValue()),
    }),

    championship: helper.accessor((row) => row.championship, {
      id: "championship",
      header: "Championship",
      size: 400,
    }),

    buildTitleColumns: (championships: Championship[]) => helper.group({
      header: "Title History",
      columns: championships.map((c) =>
        helper.accessor((row) => row.reigns[c.id] ?? 0, {
          id: `title-${c.id}`,
          header: shortTitleName(c.name),
          size: 175,
          cell: (info) => hideZero(info.getValue()),
        })
      ),
    }),
  }
}
