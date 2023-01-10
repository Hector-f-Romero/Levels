import { Router } from "express";
import { check } from "express-validator";
import multer from "multer";
import {
	deleteCoverAlbum,
	getAlbumCover,
	putAlbumCover,
	uploadAlbumCover,
} from "../controllers/uploads.images.controller";
import { validateFields } from "../middlewares/validate-fields";
import { albumIdExist } from "../validators/db-validators";

const upload = multer({
	storage: multer.memoryStorage(),
});

const router: Router = Router();
// router.get("/:folder/:id", [fileIdAndFolderExists], getFile);
// router.post("/:folder/:id", , uploadFile);
// router.post("/:folder/:id", upload.single("file"), uploadFile);
// router.get("/albums/:id", [uploadFileMiddleware("coverAlbum"), fileIdAndFolderExists], uploadFile);
router.get("/albums/:id", getAlbumCover);
router.post("/albums/:id", [upload.single("albumCover")], uploadAlbumCover);
router.put("/albums/:id", [upload.single("albumCover")], putAlbumCover);
router.delete("/albums/:id", deleteCoverAlbum);
// router.put("/albums/:id", [uploadImageMiddleware("coverAlbum"), fileIdAndFolderExists], uploadFile);
// router.delete("/albums/:id", [uploadFileMiddleware("coverAlbum"), fileIdAndFolderExists], uploadFile);
// router.put("/:folder/:id", [uploadFileMiddleware("file"), fileExists, fileIdAndFolderExists], putFile);
// router.delete("/:folder/:id", [verifyJWT, isAdminRole, fileIdAndFolderExists], deleteFile);

export default router;
