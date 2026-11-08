import { BookedMatch, BookingContext } from "../types";

export default class StandardPpvBooking<C extends BookingContext = BookingContext> {
  constructor(protected rng: () => number = Math.random) {}

  bookExhibition(ctx: C): BookedMatch[] {
    return [];
  }

  bookContenders(ctx: C): BookedMatch[] {
    return [];
  }

  bookPpv(ctx: C): BookedMatch[] {
    return [];
  }
};
