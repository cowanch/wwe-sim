import prisma from "../lib/prisma";

interface CreateCycleInput {
	ppvId: number;
	year: number;
}

interface PpvFilters {}

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

export async function getPpvs(names?: string[]) {
  return prisma.ppv.findMany({
    where: {
      name: { in: names },
    },
    orderBy: [
      { month: "asc" },
      { week: "asc" },
      { day: "asc" },
    ],
  });
}

export async function getLatestCycles() {
  const latest = await prisma.ppvCycle.findFirst({
    orderBy: [
      { year: "desc" },
      { ppv: { month: "desc" } },
      { ppv: { week: "desc" } },
      { ppv: { day: "desc" } },
    ],
    include: { ppv: true },
  });

  if (!latest) return [];

  return prisma.ppvCycle.findMany({
    where: {
      year: latest.year,
      ppv: { month: latest.ppv.month, week: latest.ppv.week },
    },
    orderBy: { ppv: { day: "asc" } },
    include: { ppv: true },
  });
}
