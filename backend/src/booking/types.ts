import { MatchType, Phase, Superstar, Tournament } from "@prisma/client";
import { MatchDetailed, TournamentDetailed } from "../services/matchService";

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

export interface RosterContext {
  roster: BrandRoster;
}

export interface TournamentContext {
  tournaments: TournamentDetailed[];
}

export type BookingContext = RosterContext | TournamentContext;

export interface PpvBooking<C extends BookingContext = BookingContext> {
  bookMatches: (ctx: C) => BookedMatch[];
  checkMatches: (matches: MatchDetailed[]) => BookedMatch[];
}
