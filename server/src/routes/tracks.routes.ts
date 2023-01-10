import { Router } from "express";
import { createTrack, getTracks } from "../controllers/tracks.controller";

const router = Router();

router.get("/", getTracks);
router.post("/", createTrack);

export default router;
