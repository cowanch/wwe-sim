import * as matchService from "./matchService";
import * as ppvService from  "./ppvService";
import * as strategyFactory from "../booking/strategyFactory";
import { BookedMatch } from "../booking/types";
import { PpvCycle } from "@prisma/client";

export async function checkMatches() {
  const scheduledMatches = await matchService.getScheduledMatches();
  if (scheduledMatches.length > 0) {
    return;
  }

  const latestPpvCycle = await ppvService.getLatestCycle();
  if (latestPpvCycle === null) {
    const firstPpvs = await ppvService.getPpvs(["NXT Takeover: Brooklyn", "SummerSlam"]);
    if (firstPpvs.length !== 2) {
      throw new Error("Could not find the first PPVs");
    }

    const nextCycle = ppvService.createPpvCycle({
      ppvIds: firstPpvs.map((ppv) => ppv.id),
      year: 2016,
      brands: ["RAW", "SMACKDOWN", "NXT"],
    });

    // The booking strategy for the first PPV will the firstPpv
    strategyFactory.getFirstStrategy();
  }

  // TODO: resolve roster changes based on the last cycle

  // Choose a BookingStrategy that corresponds to the next cycles

}

export async function createMatches(ppvCycle: PpvCycle, bookedMatches: BookedMatch[]) {
  for (const bookedMatch of bookedMatches) {
    const { phase, sides, titleId, matchType } = bookedMatch;
    const match = await matchService.create({
      phase,
      cycleId: ppvCycle.id,
      matchType,
      titleId,
      sides
    });
    if (bookedMatch.tournament) {
      const { id: tournamentId, matchNumber } = bookedMatch.tournament;
      await matchService.createTournamentMatch({
        tournamentId,
        matchNumber,
        matchId: match.id,
      });
    }
  }
}
