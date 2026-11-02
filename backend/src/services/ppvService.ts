import prisma from "../lib/prisma";
import type { Brand, Gender } from "@prisma/client";

interface CreateCycleInput {
	ppvId: number;
	year: number;
}

interface PpvFilters {
	gender?: Gender;
	brand?: Brand;
}

export async function getPpvById(id: number) {
  return prisma.ppv.findUnique({
    where: { id },
  });
}

export async function getCycles(filters: PpvFilters = {}) {
	return prisma.ppvCycle.findMany({
		where: {
		},
	});
}

export async function getById(id: number) {
	return prisma.superstar.findUnique({
		where: { id },
		include: { tagTeam: true, brandHistory: true },
	});
}

export async function createCycle(data: CreateCycleInput) {
  const ppv = await prisma.ppv.findFirst({
    where: {
      id: data.ppvId
    }
  });



	return prisma.ppvCycle.create({
    data: {
      ...data,

    }
  });
}
