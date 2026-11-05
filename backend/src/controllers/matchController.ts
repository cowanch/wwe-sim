import type { Request, Response } from "express";
import * as matchService from "../services/matchService";

export async function getScheduledMatches(req: Request, res: Response) {
  const matches = await matchService.getScheduledMatches();
  res.json(matches);
}
