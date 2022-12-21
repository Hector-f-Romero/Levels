import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";

import {
	albumsRoutes,
	artistsRoutes,
	authRoutes,
	playlistsRoutes,
	relationShipsRoutes,
	tracksRoutes,
	usersRoutes,
} from "./routes/index.routes";

import { connectDB } from "./config/mysql";

const app = express();
const PORT = process.env.BE_PORT || 4001;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/albums", albumsRoutes);
app.use("/api/artists", artistsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/playlists", playlistsRoutes);
app.use("/api/relationships", relationShipsRoutes);
app.use("/api/tracks", tracksRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => console.log(`API REST en funcionamiento en el puerto ${PORT} 🔥`));
