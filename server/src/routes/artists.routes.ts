import { Router } from "express";
import { createArtist, deleteArtist, getArtists } from "../controllers/artists.controller";

const router: Router = Router();

router.get("/", getArtists);
router.post("/", createArtist);
router.delete("/:id", deleteArtist);

export default router;
