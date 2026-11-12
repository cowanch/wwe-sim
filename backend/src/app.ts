import express from "express";
import cors from "cors";
import "dotenv/config";

import pinoHttp from "pino-http";
import { logger } from "./lib/logger.js";

import rosterRoutes from "./routes/rosterRoutes";
import matchRoutes from "./routes/matchRoutes";
import ppvRoutes from "./routes/ppvRoutes";

import * as bookingService from "./services/bookingService";

const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use("/api/roster", rosterRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/ppv", ppvRoutes);

bookingService.checkMatches();

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
