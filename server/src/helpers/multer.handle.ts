import { Request } from "express";
import multer from "multer";
import path from "path";

// whiteList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const trackFileFilter = function (req: Request, file: Express.Multer.File, cb: any) {
	const whiteList = ["audio/mpeg", "audio/x-wav"];
	if (!whiteList.includes(file.mimetype)) {
		cb(new Error(`File type is not allowed. Allowed formats: ${whiteList}`));
	} else {
		cb(null, true);
	}
};

const storageFileTracks = multer.diskStorage({
	destination: function (req: Request, file: Express.Multer.File, cb: any) {
		// const pathTrackFile = path.join(__dirname, `/../uploads/tracks/`);
		cb(null, `${__dirname}/../uploads/tracks/`);
	},
	filename: function (req: Request, file: Express.Multer.File, cb: any) {
		const { id } = req.params;
		console.log(id);

		cb(null, `${id}.mp3`);
	},
});

const uploadImages = multer({
	storage: multer.memoryStorage(),
});

const uploadTracks = multer({
	storage: storageFileTracks,
	fileFilter: trackFileFilter,
});

// fs.mkdir(path.join(__dirname, "../uploads/albums"), { recursive: true }, (err) => {
// 	if (err) throw err;
// });

// fs.mkdir(path.join(__dirname, "../uploads/artists"), { recursive: true }, (err) => {
// 	if (err) throw err;
// });

// fs.mkdir(path.join(__dirname, "../uploads/tracks"), { recursive: true }, (err) => {
// 	if (err) throw err;
// });

export { uploadImages, uploadTracks };
