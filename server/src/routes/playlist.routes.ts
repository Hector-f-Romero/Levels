import { Router } from "express";
import { createPlaylist } from "../controllers/playlists.controller";

const router = Router();

router.post("/playlist", createPlaylist);

export default router;
