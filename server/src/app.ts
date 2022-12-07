import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";

import tracksRoutes from "./routes/tracks.routes";
import usersRoutes from "./routes/users.routes";
import playlistRoutes from "./routes/playlist.routes";

import { connectDB } from "./config/mysql";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", tracksRoutes);
app.use("/api", usersRoutes);
app.use("/api", playlistRoutes);

app.listen(PORT, () => console.log(`API REST en funcionamiento en el puerto ${PORT} 🔥`));
