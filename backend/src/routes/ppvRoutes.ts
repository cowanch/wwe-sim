import { Router } from "express";
import * as ppvController from "../controllers/ppvController";

const router = Router();

router.get("/latest", ppvController.getLatestPpvCycle);
router.get("/list", ppvController.getAllPpvs);

export default router;
