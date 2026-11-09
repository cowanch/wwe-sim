import { MatchDetailed } from "../services/matchService";

export function isMatchCompleted(match: MatchDetailed) {
  return match.sides.some((side) => side.winner === true);
}