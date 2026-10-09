import { Router } from "express";
import superstarRoutes from "./superstarRoutes";
import tagTeamRoutes from "./tagTeamRoutes";

const router = Router();

router.use("/superstars", superstarRoutes);
router.use("/tag-teams", tagTeamRoutes);

export default router;
