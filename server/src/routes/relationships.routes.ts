import { Router } from "express";
import { addAlbumToArtist, addFeaturings, addPlaylistToUser } from "../controllers/relationships.controller";

const router: Router = Router();

router.post("/playlists/users", addPlaylistToUser);
// router.post("/track/featurings", addFeaturings);
router.post("/link/album/artists", addAlbumToArtist);

export default router;
