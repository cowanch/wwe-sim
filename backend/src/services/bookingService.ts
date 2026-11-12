import * as matchService from "./matchService";
import * as ppvService from  "./ppvService";
import { BookedMatch } from "../booking/types";
import { PpvCycle } from "@prisma/client";
import InauguralPpvBooking from "@/booking/events/InauguralPpvBooking";
import { toMatchInput } from "./bookingMapper";

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

    const nextCycle = await ppvService.createPpvCycle({
      ppvIds: firstPpvs.map((ppv) => ppv.id),
      year: 2016,
      brands: ["RAW", "SMACKDOWN", "NXT"],
    });

    const initialTournaments = await matchService.getScheduledTournaments();

    const inauguralBooking = new InauguralPpvBooking();
    const bookedMatches = inauguralBooking.bookMatches({ tournaments: initialTournaments });
    await createMatches(nextCycle, bookedMatches);
  }

  // TODO: resolve roster changes based on the last cycle

  // Choose a BookingStrategy that corresponds to the next cycles

}

export async function createMatches(ppvCycle: PpvCycle, bookedMatches: BookedMatch[]) {
  for (const bookedMatch of bookedMatches) {
    const match = await matchService.create(toMatchInput(bookedMatch, ppvCycle.id));
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
