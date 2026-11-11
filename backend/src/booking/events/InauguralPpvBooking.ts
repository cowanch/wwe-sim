import { MatchDetailed } from "@/services/matchService";
import { BookedMatch, TournamentContext } from "../types";
import { pairSeeds } from "../shared/pairings";

export default class InauguralPpvBooking {
  
  bookMatches(bookCtx: TournamentContext): BookedMatch[] {
    const { tournaments } = bookCtx;
    tournaments.forEach((tournament) => {
      const pairs = pairSeeds(tournament.seeds);
      const matches = pairs.map((pair) => {
        const match: BookedMatch = {
          phase: "EXHIBITION",
          matchType: "SINGLE",
          sides: pair.map((seed) => ({ 
            superstarId: seed?.superstarId || undefined,
            tagTeamId: seed?.tagTeamId || undefined,
          }))
        }
      });
      return matches;
    });
    return [];
  }

  checkMatches(matches: MatchDetailed[]): BookedMatch[] {
    // For each tournament, add a match according to the seeds
    return [];
  }
}