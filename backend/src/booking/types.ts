interface BookingContext {
  foo: string
}

interface BookedMatch {
  foo: string
}

export interface BookingStrategy {
  book(context: BookingContext): BookedMatch[];
}
