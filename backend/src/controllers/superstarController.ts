import type { Request, Response } from "express";
import * as superstarService from "../services/superstarService";

export async function getAll(req: Request, res: Response) {
    const superstars = await superstarService.getAllSuperstars();
    res.json(superstars);
}

export async function getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const superstar = await superstarService.getSuperstarById(id);
    if (!superstar) return res.status(404).json({ error: "Superstar not found" });
    res.json(superstar);
}

export async function create(req: Request, res: Response) {
    const { name, overall, gender } = req.body;
    if (!name || overall === undefined || !gender) {
        return res.status(400).json({ error: "name, overall, and gender are required" });
    }
    const superstar = await superstarService.createSuperstar({ name, overall, gender });
    res.status(201).json(superstar);
}
 