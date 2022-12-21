import { Router } from "express";
import {
	getAlbum,
	getAlbums,
	createAlbum,
	updateAlbum,
	deleteAlbum,
	getAlbumsWithArtist,
} from "../controllers/albums.controller";

const router = Router();

router.get("/", getAlbums);
router.get("/:id", getAlbum);
router.post("/", createAlbum);
router.patch("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

router.get("/info/artists", getAlbumsWithArtist);

export default router;
