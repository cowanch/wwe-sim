import prisma from "../lib/prisma";
import type { Brand, Gender, Phase } from "@prisma/client";

interface CreateMatchInput {
  phase: Phase
  cycleId: number;
	matchTypeId: number;
}

//   phase         Phase
//   cycle         PpvCycle
//   matchTypeId   Int
//   matchType     MatchType  @relation(fields: [matchTypeId], references: [id])
//   sides         MatchSide[]

interface SuperstarFilters {
	gender?: Gender;
	brand?: Brand;
}

export async function getById(id: number) {
	return prisma.match.findUnique({
		where: { id },
	});
}

export async function create(data: CreateMatchInput) {
	return prisma.match.create({ data });
}
