import { Router } from "express";

import {
	deleteCoverAlbum,
	getAlbumCover,
	putAlbumCover,
	uploadAlbumCover,
} from "../controllers/uploads.albumCover.controller";
import {
	deleteArtistPhoto,
	getArtistPhoto,
	putArtistPhoto,
	uploadArtistPhoto,
} from "../controllers/uploads.artistPhoto.controller";
import { deleteTrackFile, getTrackFile, putTrackFile, uploadTrackFile } from "../controllers/uploads.tracks.controller";

import { uploadImages, uploadTracks } from "../helpers/multer.handle";

const router: Router = Router();
// router.get("/:folder/:id", [fileIdAndFolderExists], getFile);
// router.post("/:folder/:id", , uploadFile);
// router.post("/:folder/:id", upload.single("file"), uploadFile);
// router.get("/albums/:id", [uploadFileMiddleware("coverAlbum"), fileIdAndFolderExists], uploadFile);
router.get("/albums/:id", getAlbumCover);
router.post("/albums/:id", [uploadImages.single("albumCover")], uploadAlbumCover);
router.put("/albums/:id", [uploadImages.single("albumCover")], putAlbumCover);
router.delete("/albums/:id", deleteCoverAlbum);

router.get("/artists/:id", getArtistPhoto);
router.post("/artists/:id", [uploadImages.single("artistPhoto")], uploadArtistPhoto);
router.put("/artists/:id", [uploadImages.single("artistPhoto")], putArtistPhoto);
router.delete("/artists/:id", deleteArtistPhoto);

router.get("/tracks/:id", getTrackFile);
router.post("/tracks/:id", [uploadTracks.single("pathTrack")], uploadTrackFile);
router.put("/tracks/:id", [uploadTracks.single("pathTrack")], putTrackFile);
router.delete("/tracks/:id", deleteTrackFile);
// router.put("/albums/:id", [uploadImageMiddleware("coverAlbum"), fileIdAndFolderExists], uploadFile);
// router.delete("/albums/:id", [uploadFileMiddleware("coverAlbum"), fileIdAndFolderExists], uploadFile);
// router.put("/:folder/:id", [uploadFileMiddleware("file"), fileExists, fileIdAndFolderExists], putFile);
// router.delete("/:folder/:id", [verifyJWT, isAdminRole, fileIdAndFolderExists], deleteFile);

export default router;
