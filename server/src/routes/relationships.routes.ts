import { Router } from "express";
import { addAlbumToArtist, addPlaylistToUser } from "../controllers/relationships.controller";

const router: Router = Router();

router.post("/playlists/users", addPlaylistToUser);
router.post("/albums/artists", addAlbumToArtist);

export default router;
