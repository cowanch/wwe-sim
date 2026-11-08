import { Division, MatchType, Phase, PpvCycle, Superstar, TagTeam } from "@prisma/client";

export interface BookedSide {
  superstarIds: number[];
  tagTeamId?: number;
  titleId?: number;
}

export interface BookedMatch {
  phase: Phase;
  matchType: MatchType;
  sides: BookedSide[];
  titleId?: number;
  // present only for tournament matches; adjust to whatever TournamentMatch stores
  tournament?: { id: number; matchNumber: number; };
}

export interface DivisionRoster {
  mainEvent: Superstar[],
  midCard: Superstar[],
  womens: Superstar[],
  tagTeam: Record<number, Superstar[]>,
}

export interface BrandRoster {
  raw?: DivisionRoster,
  smackdown?: DivisionRoster,
  nxt?: Omit<DivisionRoster, "midCard">,
}

export interface BookingContext {
  cycles: PpvCycle[],
}

export interface RosterBookingContext extends BookingContext {
  
}

export interface TournamentContext {
  id: number;
  seeds: { seedNumber: number; superstarId?: number; tagTeamId?: number }[];
  playedMatches: { round: number; slot: number; winnerSeed: number }[];
}

export interface TournamentBookingContext extends BookingContext {
  tournaments: TournamentContext[];
}

export interface BookingStrategy<C extends BookingContext = BookingContext> {
  book(context: C): BookedMatch[];
}
