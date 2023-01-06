import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";

import {
	albumsRoutes,
	artistsRoutes,
	authRoutes,
	genresRoutes,
	playlistsRoutes,
	relationShipsRoutes,
	tracksRoutes,
	uploadsRoutes,
	usersRoutes,
} from "./routes/index.routes";

import { connectDB } from "./config/mysql";
import multer from "multer";

const app = express();
const PORT = process.env.BE_PORT || 4001;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/albums", albumsRoutes);
app.use("/api/artists", artistsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/playlists", playlistsRoutes);
app.use("/api/relationships", relationShipsRoutes);
app.use("/api/tracks", tracksRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/users", usersRoutes);

// app.use((err: any, req: any, res: any, next: any) => {
// 	if (err instanceof multer.MulterError) {
// 		res.status(500).json({ err_code: err.code, err_message: err.message });
// 		// A Multer error occurred when uploading.
// 	} else if (err) {
// 		// An unknown error occurred when uploading.
// 		res.status(500).json({
// 			err_code: 409,
// 			err_message: "Something went wrong!",
// 		});
// 	}
// });

app.listen(PORT, () => console.log(`API REST en funcionamiento en el puerto ${PORT} 🔥`));
