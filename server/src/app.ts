import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";

import albumsRoutes from "./routes/albums.routes";
import authRoutes from "./routes/auth.routes";
import tracksRoutes from "./routes/tracks.routes";
import usersRoutes from "./routes/users.routes";

import { connectDB } from "./config/mysql";

const app = express();
const PORT = process.env.BE_PORT || 4001;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", tracksRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/album", albumsRoutes);

app.listen(PORT, () => console.log(`API REST en funcionamiento en el puerto ${PORT} 🔥`));
