import { BookedMatch, TournamentBookingContext } from "../types";
import StandardPpvBooking from "./StandardPpvBooking";

export default class InauguralPpvBooking extends StandardPpvBooking<TournamentBookingContext> {
  bookExhibition(ctx: TournamentBookingContext): BookedMatch[] {
    // For each tournament, add a match according to the seeds
    return [];
  }
}