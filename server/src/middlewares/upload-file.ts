import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import multer from "multer";
import { applyFileFilters, setDestinationFolder } from "../helpers/multer.handle";

const storage = multer.diskStorage({
	destination: setDestinationFolder,
	filename: function (req, file, cb) {
		const ext = file.originalname.split(".").pop();
		const fileName = `${req.params.id}.${ext}`;
		cb(null, fileName);
	},
});

// const upload = multer({
// 	storage,
// 	fileFilter: applyFileFilters,
// });

const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const upload = multer({
		storage,
		fileFilter: applyFileFilters,
	}).single("file");

	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json({ msg: " A Multer error occurred when uploading." });
		} else if (err) {
			return res.status(500).json({ msg: "An unknown error occurred when uploading." });
		}
		next();
	});
};

export { myMiddleware };
