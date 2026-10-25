import prisma from "../lib/prisma";
import type { Brand, Gender } from "@prisma/client";

interface CreateSuperstarInput {
	name: string;
	overall: number;
	gender: Gender;
}

interface SuperstarFilters {
	gender?: Gender;
	brand?: Brand;
}

export async function getAll(filters: SuperstarFilters = {}) {
	return prisma.superstar.findMany({
		where: {
			gender: filters.gender,
			tagTeam: null,
		},
	});
}

export async function getById(id: number) {
	return prisma.superstar.findUnique({
		where: { id },
		include: { tagTeam: true, brandHistory: true },
	});
}

export async function create(data: CreateSuperstarInput) {
	return prisma.superstar.create({ data });
}
