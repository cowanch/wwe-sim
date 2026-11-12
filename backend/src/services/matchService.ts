import { logger } from "@/lib/logger";
import prisma from "../lib/prisma";
import type { MatchType, Phase, Prisma } from "@prisma/client";

const matchWithRelations = {
	include: { sides: true, tournament: true },
} satisfies Prisma.MatchDefaultArgs;

const tournamentWithSeeds = {
	include: { seeds: true },
} satisfies Prisma.TournamentDefaultArgs;

export type MatchDetailed = Prisma.MatchGetPayload<typeof matchWithRelations>;
export type TournamentDetailed = Prisma.TournamentGetPayload<typeof tournamentWithSeeds>;

export interface CreateMatchInput {
  phase: Phase
  cycleId: number;
	matchType: MatchType;
	titleId?: number;
	sides: MatchSideInput[];
}

export interface MatchSideInput {
	superstarIds: number[];
	tagTeamId?: number;
	titleId?: number;
}

export interface TournamentMatchInput {
	tournamentId: number;
	matchId: number;
	matchNumber: number;
}

export async function getById(id: number) {
	return prisma.match.findUnique({
		where: { id },
	});
}

export async function getScheduledMatches(): Promise<MatchDetailed[]> {
	return prisma.match.findMany({
		...matchWithRelations,
		where: {
			sides: { none: { winner: true } },
		},
	});
}

export async function create(data: CreateMatchInput): Promise<MatchDetailed> {
	const { phase, cycleId, matchType, titleId, sides } = data;
	logger.info({ ...data }, "creating matches");
	const createSides = sides.map((side) => ({
		winner: false,
		superstars: {
			connect: side.superstarIds.map((id) => ({ id }))
		},
		tagTeamId: side.tagTeamId,
		titleId: side.titleId,
	}));

	return prisma.match.create({
		...matchWithRelations,
		data: {
			phase,
			cycleId,
			matchType,
			titleId,
			sides: {
				create: createSides,
			},
		},
	});
}

export async function getScheduledTournaments(): Promise<TournamentDetailed[]> {
	return prisma.tournament.findMany({
		...tournamentWithSeeds,
		where: { matches: { none: {} } },
	});
}

export async function createTournamentMatch(data: TournamentMatchInput) {
	logger.info({ ...data }, "creating tournament matches");
	return prisma.tournamentMatch.create({ data });
}
