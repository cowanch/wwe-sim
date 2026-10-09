import prisma from "../lib/prisma";
import type { Gender } from "@prisma/client";

interface CreateSuperstarInput {
    name: string;
    overall: number;
    gender: Gender;
}

export async function getAll() {
    return prisma.superstar.findMany({
        include: { tagTeam: true },
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
