import { Router } from "express";
import {
	addPlaylistToUser,
	createPlaylist,
	deletePlaylist,
	getPlaylist,
	getPlaylists,
	updatePlaylist,
} from "../controllers/playlists.controller";

const router = Router();

router.get("/", getPlaylists);
router.get("/:id", getPlaylist);
router.post("/", createPlaylist);
router.patch("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);
router.post("/add", addPlaylistToUser);

export default router;
