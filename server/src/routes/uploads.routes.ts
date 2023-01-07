import { Router } from "express";
import { deleteFile, getFile, putFile, uploadFile } from "../controllers/uploads.controller";
import { uploadFileMiddleware } from "../middlewares/upload-file";
import { verifyJWT } from "../middlewares/verify-jwt";
import { fileExists, fileIdAndFolderExists } from "../validators/upload.validator";

const router: Router = Router();
router.get("/:folder/:id", [fileIdAndFolderExists], getFile);
// router.post("/:folder/:id", , uploadFile);
// router.post("/:folder/:id", upload.single("file"), uploadFile);
router.post("/:folder/:id", [uploadFileMiddleware("file"), fileExists, fileIdAndFolderExists], uploadFile);
router.put("/:folder/:id", [uploadFileMiddleware("file"), fileExists, fileIdAndFolderExists], putFile);
router.delete("/:folder/:id", [verifyJWT, fileIdAndFolderExists], deleteFile);

export default router;
