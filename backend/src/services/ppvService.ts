import { Prisma, WeekOfMonth, Weekday, Brand, PpvCycle } from "@prisma/client";
import prisma from "../lib/prisma";

export const cycleWithRelations = {
  include: { ppvs: true },
} satisfies Prisma.PpvCycleDefaultArgs;

export type PpvCycleWithRelations = Prisma.PpvCycleGetPayload<
  typeof cycleWithRelations
>;

interface CreateCycleInput {
	ppvIds: number[];
  brands: Brand[];
	year: number;
}

// Object.values follows the enum declaration order, so these stay in sync with the schema
const WEEKS = Object.values(WeekOfMonth);
const DAYS = Object.values(Weekday);

function ppvRank(p: { month: number; week: WeekOfMonth; day: Weekday }) {
  return p.month * 1000 + WEEKS.indexOf(p.week) * 10 + DAYS.indexOf(p.day);
}

export async function getPpvById(id: number) {
  return prisma.ppv.findUnique({
    where: { id },
  });
}

export async function getCycles() {
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

export async function getLatestCycle() {
  const newest = await prisma.ppvCycle.findFirst({
    orderBy: { year: "desc" },
    select: { year: true },
  });
  if (!newest) return null;

  const cycles = await prisma.ppvCycle.findMany({
    where: { year: newest.year },
    include: { ppvs: true },
  });

  const cycleRank = (c: (typeof cycles)[number]) =>
    Math.max(...c.ppvs.map(ppvRank));

  return cycles.sort((a, b) => cycleRank(b) - cycleRank(a))[0] ?? null;
}

export async function createPpvCycle(data: CreateCycleInput): Promise<PpvCycleWithRelations> {
  const { year, brands, ppvIds } = data;
  const ppvs = { 
    connect: ppvIds.map((id) => ({ id }))
  };
  return prisma.ppvCycle.create({
    data: {
      year,
      ppvs,
      brands,
    },
    include: { ppvs: true },
  });
}
