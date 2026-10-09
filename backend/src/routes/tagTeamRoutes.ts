import { Router } from "express";
import * as tagTeamController from "../controllers/tagTeamController";

const router = Router();

router.get("/", tagTeamController.getAll);
router.get("/:id", tagTeamController.getById);
router.post("/", tagTeamController.create);

export default router;
