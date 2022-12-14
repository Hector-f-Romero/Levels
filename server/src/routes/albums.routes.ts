import { Router } from "express";
import { getAlbum, getAlbums, createAlbum, updateAlbum, deleteAlbum } from "../controllers/albums.controller";

const router = Router();

router.get("/", getAlbums);
router.get("/:id", getAlbum);
router.post("/", createAlbum);
router.patch("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

export default router;
