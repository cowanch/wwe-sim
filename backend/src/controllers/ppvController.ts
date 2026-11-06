import type { Request, Response } from "express";
import * as ppvService from "../services/ppvService";

export async function getAllPpvs(req: Request, res: Response) {
  const ppvs = await ppvService.getPpvs();
  res.json(ppvs);
}

export async function getLatestPpvCycle(req: Request, res: Response) {
  const cycles = await ppvService.getLatestCycles();
  res.json(cycles);
}
