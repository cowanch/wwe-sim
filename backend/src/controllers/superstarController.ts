import type { Request, Response } from "express";
import * as superstarService from "../services/superstarService";

export async function getAll(req: Request, res: Response) {
	const { gender } = req.query;

	if (gender !== undefined && gender !== "M" && gender !== "F") {
		return res.status(400).json({ error: "gender must be M or F" });
	}

	const superstars = await superstarService.getAll({ gender });
	res.json(superstars.map((superstar) => ({
		...superstar,
		rank: superstar.overall,
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
	})));
}

export async function getById(req: Request, res: Response) {
	const id = Number(req.params.id);
	const superstar = await superstarService.getById(id);
	if (!superstar) return res.status(404).json({ error: "Superstar not found" });
	res.json(superstar);
}

export async function create(req: Request, res: Response) {
	const { name, overall, gender } = req.body;
	if (!name || overall === undefined || !gender) {
		return res.status(400).json({ error: "name, overall, and gender are required" });
	}
	const superstar = await superstarService.create({ name, overall, gender });
	res.status(201).json(superstar);
}
