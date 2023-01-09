import { NextFunction, Request, Response } from "express";
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

/**
 * Verify if exists errors at moment to upload a file
 * @param fieldForm name of the field in the frontend that receive the file uploaded by the user.
 * @returns
 */
const uploadFileMiddleware = (fieldForm: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const upload = multer({
				storage: multer.memoryStorage(),
				fileFilter: applyFileFilters,
			}).single(fieldForm);

			upload(req, res, function (err) {
				if (err instanceof multer.MulterError) {
					if (err.code === "LIMIT_UNEXPECTED_FILE") {
						return res
							.status(500)
							.json({ msg: " A Multer error occurred when uploading: form field key don't exists." });
					}
					return res.status(500).json({ msg: " A Multer error occurred when uploading." });
				} else if (err) {
					return res.status(500).json({
						msg: "An unknown error occurred when uploading. Verify if the extension if correct for the folder.",
						err: err,
					});
				}
				next();
			});
		} catch (error) {
			res.status(505).json({ msg: error });
		}
	};
};

export { uploadFileMiddleware };
