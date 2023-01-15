import { Router } from "express";
import {
	addAlbumToArtist,
	addFeaturings,
	addPlaylistToUser,
	getAlbumWithTracks,
} from "../controllers/relationships.controller";

const router: Router = Router();

router.get("/albums/info/:id", getAlbumWithTracks);
router.post("/playlists/users", addPlaylistToUser);
// router.post("/track/featurings", addFeaturings);
router.post("/link/album/artists", addAlbumToArtist);

export default router;
