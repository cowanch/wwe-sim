import prisma from "../lib/prisma";
import type { Gender } from "@prisma/client";

interface CreateSuperstarInput {
    name: string;
    overall: number;
    gender: Gender;
}

export async function getAllSuperstars() {
    return prisma.superstar.findMany({
        include: { tagTeam: true },
    });
}

export async function getSuperstarById(id: number) {
    return prisma.superstar.findUnique({
        where: { id },
        include: { tagTeam: true, brandHistory: true },
    });
}

export async function createSuperstar(data: CreateSuperstarInput) {
    return prisma.superstar.create({ data });
}
