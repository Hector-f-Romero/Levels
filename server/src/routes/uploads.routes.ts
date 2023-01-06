import { Router } from "express";
import { getFile, uploadFile } from "../controllers/uploads.controller";
import { myMiddleware } from "../middlewares/upload-file";

const router: Router = Router();
router.get("/:folder/:id", getFile);
// router.post("/:folder/:id", , uploadFile);
// router.post("/:folder/:id", upload.single("file"), uploadFile);
router.post("/:folder/:id", myMiddleware, uploadFile);

export default router;
