import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";

import { albumRoutes, authRoutes, playlistsRoutes, tracksRoutes, usersRoutes } from "./routes/index.routes";

import { connectDB } from "./config/mysql";

const app = express();
const PORT = process.env.BE_PORT || 4001;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/album", albumRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/playlist", playlistsRoutes);
app.use("/api/track", tracksRoutes);
app.use("/api/user", usersRoutes);

app.listen(PORT, () => console.log(`API REST en funcionamiento en el puerto ${PORT} 🔥`));
