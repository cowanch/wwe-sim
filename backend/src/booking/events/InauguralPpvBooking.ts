import { MatchDetailed } from "@/services/matchService";
import { BookedMatch, TournamentContext } from "../types";
import { pairSeeds } from "../shared/pairings";
import { logger } from "@/lib/logger";
import { MatchType, Phase } from "@prisma/client";

export default class InauguralPpvBooking {
  
  bookMatches(bookCtx: TournamentContext): BookedMatch[] {
    const { tournaments } = bookCtx;
    logger.info(
      { tournaments: tournaments.map((tournament) => tournament.name) },
      "booking matches for inagural tournaments"
    );
    const bookedMatches: BookedMatch[] = [];
    tournaments.forEach((tournament) => {
      const pairs = pairSeeds(tournament.seeds);
      const matches = pairs.map((pair) => ({
        phase: Phase.EXHIBITION,
        matchType: pair[0].tagTeamId ? MatchType.TAG_TEAM : MatchType.SINGLE,
        sides: pair.map((seed) => ({ 
          superstarId: seed?.superstarId || undefined,
          tagTeamId: seed?.tagTeamId || undefined,
        }))
      }));
      bookedMatches.push(...matches);
    });
    return bookedMatches;
  }

  checkMatches(matches: MatchDetailed[]): BookedMatch[] {
    // For each tournament, add a match according to the seeds
    return [];
  }
}