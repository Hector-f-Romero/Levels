import { Router } from "express";
import { createGenre, getGenre, getGenres } from "../controllers/genres.controller";

const router = Router();

router.get("/", getGenres);
router.get("/:id", getGenre);
router.post("/", createGenre);

export default router;
