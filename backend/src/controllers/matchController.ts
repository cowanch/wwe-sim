import type { Request, Response } from "express";
import * as matchService from "../services/matchService";

export async function getScheduledMatches(req: Request, res: Response) {
  req.log.info("fetching scheduled matches");
  const matches = await matchService.getScheduledMatches();
  res.json(matches);
}
