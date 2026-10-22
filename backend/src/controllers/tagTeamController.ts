import type { Request, Response } from "express";
import * as tagTeamService from "../services/tagTeamService";

export async function getAll(req: Request, res: Response) {
	const tagTeams = await tagTeamService.getAll();

	res.json(tagTeams.map((tagTeam) => {
		const overall = tagTeam.members.reduce((acc, curr) => acc + curr.overall, 0) / tagTeam.members.length;
		return {
			...tagTeam,
			overall,
			rank: overall,
			wins: 0,
			losses: 0,
			ppvWins: 0,
			ppvLosses: 0,
			championship: null,
			reigns: {
				wwe: 0,
				universal: 0,
				nxt: 0,
				intercontinental: 0,
				unitedStates: 0,
				rawWomens: 0,
				smackdownWomens: 0,
				nxtWomens: 0,
				rawTagTeam: 0,
				smackdownTagTeam: 0,
				nxtTagTeam: 0,
			},
		}
	}));

	res.json(tagTeams);
}

export async function getById(req: Request, res: Response) {
	const id = Number(req.params.id);
	const tagTeam = await tagTeamService.getById(id);
	if (!tagTeam) return res.status(404).json({ error: "Tag team not found" });
	res.json(tagTeam);
}

export async function create(req: Request, res: Response) {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: "name is required" });
	}
	const tagTeam = await tagTeamService.create({ name });
	res.status(201).json(tagTeam);
}
