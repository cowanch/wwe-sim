// src/app.ts
import express from "express";
import cors from "cors";
import "dotenv/config";

import rosterRoutes from "./routes/rosterRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/roster", rosterRoutes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
