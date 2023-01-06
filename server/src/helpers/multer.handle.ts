const setDestinationFolder = function (req: any, file: Express.Multer.File, cb: any) {
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

const applyFileFilters = function (req: any, file: Express.Multer.File, cb: any) {
	let whiteList: string[];
	console.log(file.mimetype);
	switch (req.params.folder) {
		case "albums":
			console.log("Adentro del case de albums");
			whiteList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
			if (!whiteList.includes(file.mimetype)) {
				// req.fileValidationError = `File type is not allowed. Allowed formats: ${whiteList}`;
				// cb(null, false, req.fileValidationError)
				console.log("No es una imagen");
				cb(new Error(`File type is not allowed. Allowed formats: ${whiteList}`), false);
				// cb(null, false);
			} else {
				console.log("Formato válido");
				cb(null, true);
			}
			break;
		case "artists":
			whiteList = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
			if (!whiteList.includes(file.mimetype)) {
				cb(new Error(`File type is not allowed. Allowed formats: ${whiteList}`));
			}
			cb(null, true);
			break;
		case "tracks":
			whiteList = ["audio/mpeg", "audio/x-wav"];
			if (!whiteList.includes(file.mimetype)) {
				cb(new Error(`File type is not allowed. Allowed formats: ${whiteList}`));
			}
			cb(null, true);
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
