import { Router } from "express";
import * as superstarController from "../controllers/superstarController";

const router = Router();

router.get("/", superstarController.getAll);
router.get("/:id", superstarController.getById);
router.post("/", superstarController.create);

export default router;
