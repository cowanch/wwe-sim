import { Router } from "express";
import * as matchController from "../controllers/matchController";

const router = Router();

router.get("/scheduled", matchController.getScheduledMatches);

export default router;
