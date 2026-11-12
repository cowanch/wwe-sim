// services/bookingMappers.ts
import type { BookedMatch, BookedSide } from "../booking/types.js";
import type { CreateMatchInput, MatchSideInput } from "./matchService.js";

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
