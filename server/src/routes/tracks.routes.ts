import { Router } from "express";
import { createTrack } from "../controllers/tracks.controller";

const router = Router();

// router.get("/tracks", );
router.post("/", createTrack);

export default router;
