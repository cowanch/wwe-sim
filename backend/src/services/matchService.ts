import prisma from "../lib/prisma";
import type { MatchType, Phase } from "@prisma/client";

interface CreateMatchInput {
  phase: Phase
  cycleId: number;
	matchType: MatchType;
	titleId?: number;
	sides: MatchSideInput[];
}

interface MatchSideInput {
	superstarIds: number[];
	tagTeamId?: number;
	titleId?: number;
}

interface TournamentMatchInput {
	tournamentId: number;
	matchId: number;
	matchNumber: number;
}

export async function getById(id: number) {
	return prisma.match.findUnique({
		where: { id },
	});
}

export async function getScheduledMatches() {
	return prisma.match.findMany({
		where: {
			sides: { none: { winner: true } },
		},
	});
}

export async function create(data: CreateMatchInput) {
	const { phase, cycleId, matchType, titleId, sides } = data;
	const createSides = sides.map((side) => ({
		winner: false,
		superstars: {
			connect: side.superstarIds.map((id) => ({ id }))
		},
		tagTeamId: side.tagTeamId,
		titleId: side.titleId,
	}));

	return prisma.match.create({
		data: {
			phase,
			cycleId,
			matchType,
			titleId,
			sides: {
				create: createSides,
			},
		},
		include: { sides: { include: { superstars: true } } },
	});
}

export async function createTournamentMatch(data: TournamentMatchInput) {
	return prisma.tournamentMatch.create({ data })
}
