import { MatchDetailed } from "@/services/matchService";
import { BookedMatch, BookingContext, PpvBooking } from "../types";

export default abstract class BasePpvBooking<C extends BookingContext> implements PpvBooking<C> {
  abstract bookMatches(ctx: C): BookedMatch[];
  checkMatches(matches: MatchDetailed[]): BookedMatch[] { 
    return []; 
  }
}
