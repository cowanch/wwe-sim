import prisma from "../lib/prisma";

interface CreateTagTeamInput {
    name: string;
}

export async function getAll() {
    const teams = await prisma.tagTeam.findMany({
        include: {
            members: {
                orderBy: { order: "asc" },
                include: { superstar: { select: { id: true, name: true } } },
            }
        },
    });
    return teams.map(team => ({
        id: team.id,
        name: team.name,
        members: team.members.map(member => member.superstar),
    }));
}

export async function getById(id: number) {
    return prisma.tagTeam.findUnique({
        where: { id },
        include: { members: true },
    });
}

export async function create(data: CreateTagTeamInput) {
    return prisma.tagTeam.create({ data });
}
