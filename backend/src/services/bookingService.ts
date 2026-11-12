import * as matchService from "./matchService";
import * as ppvService from  "./ppvService";
import { BookedMatch } from "../booking/types";
import { PpvCycle } from "@prisma/client";
import InauguralPpvBooking from "@/booking/events/InauguralPpvBooking";
import { toMatchInput, toTournamentMatchInput } from "./bookingMapper";
import { logger } from "@/lib/logger";

export async function checkMatches() {
  logger.info("checking matches");
  const scheduledMatches = await matchService.getScheduledMatches();
  if (scheduledMatches.length > 0) {
    return;
  }

  const latestPpvCycle = await ppvService.getLatestCycle();
  if (latestPpvCycle === null) {
    logger.info("no PPV cycle set, start with first PPV");
    const firstPpvs = await ppvService.getPpvs(["NXT Takeover: Brooklyn", "SummerSlam"]);
    if (firstPpvs.length !== 2) {
      throw new Error("Could not find the first PPVs");
    }

    const nextCycle = await ppvService.createPpvCycle({
      ppvIds: firstPpvs.map((ppv) => ppv.id),
      year: 2016,
      brands: ["RAW", "SMACKDOWN", "NXT"],
    });

    logger.info("fetching initial tournaments");
    const initialTournaments = await matchService.getScheduledTournaments();

    const inauguralBooking = new InauguralPpvBooking();
    const bookedMatches = inauguralBooking.bookMatches({ tournaments: initialTournaments });
    logger.info({ bookedMatches }, "booked matches");
    await createMatches(nextCycle, bookedMatches);
  } else {
    logger.info("no new matches created");
  }
}

export async function createMatches(ppvCycle: PpvCycle, bookedMatches: BookedMatch[]) {
  for (const bookedMatch of bookedMatches) {
    const match = await matchService.create(
      toMatchInput(bookedMatch, ppvCycle.id)
    );
    if (bookedMatch.tournament) {
      await matchService.createTournamentMatch(
        toTournamentMatchInput(match, bookedMatch.tournament)
      );
    }
  }
}
