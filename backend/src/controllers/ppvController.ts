import type { Request, Response } from "express";
import * as ppvService from "../services/ppvService";

export async function getAllPpvs(req: Request, res: Response) {
  req.log.info("fetching all PPVs");
  const ppvs = await ppvService.getPpvs();
  res.json(ppvs);
}

export async function getLatestPpvCycle(req: Request, res: Response) {
  req.log.info("fetching latest PPV cycle");
  const cycle = await ppvService.getLatestCycle();
  res.json(cycle);
}
