import { Request } from "express";

const setDestinationFolder = function (req: Request, file: Express.Multer.File, cb: any) {
	let folder = "";
	switch (req.params.folder) {
		case "albums":
			folder = "albums";
			break;
		case "artists":
			folder = "artists";
			break;
		case "tracks":
			folder = "tracks";
			break;
		default:
			cb(new Error("Folder name invalid"), "");
			break;
	}
	cb(null, `${__dirname}/../uploads/${folder}`);
};

const applyFileFilters = function (req: Request, file: Express.Multer.File, cb: any) {
	let whiteList: string[];
	console.log(file);
	switch (req.params.folder) {
		case "albums":
			whiteList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
			if (!whiteList.includes(file.mimetype)) {
				console.log("No pasó el filtro");
				cb(new Error(`File type is not allowed. Allowed formats: ${whiteList}`));
			} else {
				console.log("Pasó el filtro");
				cb(null, true);
			}
			break;
		case "artists":
			whiteList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
			if (!whiteList.includes(file.mimetype)) {
				cb(new Error(`File type is not allowed. Allowed formats: ${whiteList}`));
			} else {
				cb(null, true);
			}
			break;
		case "tracks":
			whiteList = ["audio/mpeg", "audio/x-wav"];
			if (!whiteList.includes(file.mimetype)) {
				cb(new Error(`File type is not allowed. Allowed formats: ${whiteList}`));
			} else {
				cb(null, true);
			}
			break;
		default:
			cb(new Error("Folder not valid."));
			break;
	}
};

// fs.mkdir(path.join(__dirname, "../uploads/albums"), { recursive: true }, (err) => {
// 	if (err) throw err;
// });

// fs.mkdir(path.join(__dirname, "../uploads/artists"), { recursive: true }, (err) => {
// 	if (err) throw err;
// });

// fs.mkdir(path.join(__dirname, "../uploads/tracks"), { recursive: true }, (err) => {
// 	if (err) throw err;
// });

export { applyFileFilters, setDestinationFolder };
