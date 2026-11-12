// services/bookingMappers.ts
import type { BookedMatch, BookedSide, TournamentInfo } from "../booking/types.js";
import type { CreateMatchInput, MatchDetailed, MatchSideInput, TournamentMatchInput } from "./matchService.js";

export function toMatchSideInput(side: BookedSide): MatchSideInput {
  return {
    superstarIds: side.superstarId ? [side.superstarId] : [],
    tagTeamId: side.tagTeamId,
    titleId: side.titleId,
  };
}

export function toMatchInput(match: BookedMatch, cycleId: number): CreateMatchInput {
  return {
    cycleId,
    phase: match.phase,
    matchType: match.matchType,
    titleId: match.titleId,
    sides: match.sides.map(toMatchSideInput),
  };
}

export function toTournamentMatchInput(match: MatchDetailed, tournament: TournamentInfo): TournamentMatchInput {
  return {
    tournamentId: tournament.id,
    matchId: match.id,
    matchNumber: tournament.matchNumber,
  };
}
