import { MatchDetailed } from "@/services/matchService";
import { BookedMatch, TournamentContext } from "../types";
import BasePpvBooking from "./BasePpvBooking";

export default class InauguralPpvBooking extends BasePpvBooking<TournamentContext> {
  
  override bookMatches(bookCtx: TournamentContext): BookedMatch[] {
    const { tournaments } = bookCtx;
    tournaments.forEach((tournament) => {
      // tournament.seeds
    });
    return [];
  }

  override checkMatches(matches: MatchDetailed[]): BookedMatch[] {
    // For each tournament, add a match according to the seeds
    return [];
  }
}