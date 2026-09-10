// src/app.ts
import express from "express";
import cors from "cors";
import "dotenv/config";

import superstarRoutes from "./routes/superstarRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/superstars", superstarRoutes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
