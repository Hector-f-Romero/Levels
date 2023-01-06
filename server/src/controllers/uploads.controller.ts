import path from "path";
import fs from "fs";
import { existsSync } from "node:fs";

import { Request, Response } from "express";
import { AppDataSource } from "../config/mysql";
import { Album, Artist, Track } from "../entities/index.entity";

import { handleHttp } from "../helpers/error.handle";

const albumRepository = AppDataSource.getRepository(Album);
const trackRepository = AppDataSource.getRepository(Track);
const artistRepository = AppDataSource.getRepository(Artist);

const getFile = async (req: Request, res: Response): Promise<void> => {
	try {
		const { folder, id } = req.params;
		let pathFile = "";
		let entity;
		switch (folder) {
			case "albums":
				entity = await albumRepository.findOneBy({ idAlbum: Number(id) });
				pathFile = path.join(__dirname, `../uploads/${folder}/${entity?.albumCover}`);
				break;
			case "artists": {
				entity = await artistRepository.findOneBy({ idArtist: Number(id) });
				pathFile = path.join(__dirname, `../uploads/${folder}/${entity?.artistPhoto}`);
				break;
			}
			case "tracks": {
				entity = await trackRepository.findOneBy({ idTrack: Number(id) });
				pathFile = path.join(__dirname, `../uploads/tracks/${entity?.pathTrack}`);
				break;
			}
			default:
				console.log("Folder don't exists.");
				throw new Error("Folder not allowed");
		}
		if (existsSync(pathFile)) {
			res.sendFile(pathFile);
		} else {
			pathFile = path.join(__dirname, `../uploads/Not-found.jpg`);
			res.sendFile(pathFile);
		}
	} catch (error) {
		handleHttp(res, error, "GET_IMAGE (GET)");
	}
};

const uploadFile = async (req: Request, res: Response) => {
	try {
		// if (!req.file) {
		// 	return res.status(404).json({ msg: "File doesn't exists." });
		// }

		// const { folder, id } = req.params;

		// let entity;
		// const ext = req.file.originalname.split(".").pop();
		// switch (folder) {
		// 	case "albums":
		// 		entity = await albumRepository.findOneBy({ idAlbum: Number(id) });

		// 		if (!entity) {
		// 			return res.status(404).json({ msg: "Doesn't exist entity with this id." });
		// 		}

		// 		entity.albumCover = `${req.params.id}.${ext}`;
		// 		await albumRepository.save(entity);
		// 		break;
		// 	case "artists": {
		// 		entity = await artistRepository.findOneBy({ idArtist: Number(id) });

		// 		if (!entity) {
		// 			return res.status(404).json({ msg: "Doesn't exist entity with this id." });
		// 		}
		// 		entity.artistPhoto = `${req.params.id}.${ext}`;
		// 		await artistRepository.save(entity);
		// 		break;
		// 	}
		// 	case "tracks": {
		// 		entity = await trackRepository.findOneBy({ idTrack: Number(id) });

		// 		if (!entity) {
		// 			return res.status(404).json({ msg: "Doesn't exist entity with this id." });
		// 		}
		// 		entity.pathTrack = `${req.params.id}.${ext}`;
		// 		await artistRepository.save(entity);
		// 		break;
		// 	}
		// 	default:
		// 		throw new Error("File not allowed");
		// }
		// res.status(201).json(entity);

		res.send("send");
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

export { getFile, uploadFile };
