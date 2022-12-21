import { Router } from "express";
import {
	createPlaylist,
	deletePlaylist,
	getPlaylist,
	getPlaylists,
	updatePlaylist,
} from "../controllers/playlists.controller";

const router: Router = Router();

router.get("/", getPlaylists);
router.get("/:id", getPlaylist);
router.post("/", createPlaylist);
router.patch("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);

export default router;
