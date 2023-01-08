import path from "path";
import { existsSync, unlink } from "node:fs";

import { Request, Response } from "express";
import { AppDataSource } from "../config/mysql";
import { Album, Artist, Track } from "../entities/";

import { handleHttp } from "../helpers/error.handle";

const albumRepository = AppDataSource.getRepository(Album);
const trackRepository = AppDataSource.getRepository(Track);
const artistRepository = AppDataSource.getRepository(Artist);
const storageLocation = `${process.env.FILES_STORAGE_URI}/api/uploads`;

const getFile = async (req: Request, res: Response): Promise<void> => {
	try {
		const { folder } = req.params;
		let pathFile = "";
		const entity = res.locals.entity;
		switch (folder) {
			case "albums":
				pathFile = path.join(__dirname, `../uploads/albums/${entity.idAlbum}.jpg`);
				break;
			case "artists": {
				pathFile = path.join(__dirname, `../uploads/artists/${entity.idArtists}.jpg`);
				break;
			}
			case "tracks": {
				pathFile = path.join(__dirname, `../uploads/tracks/${entity?.pathTrack}.mp3`);
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
		if (!req.file) {
			res.status(404).json({ msg: `Don't exists file or files into request.` });
		}

		const entity = res.locals.entity;
		switch (req.params.folder) {
			case "albums":
				entity.albumCover = `${storageLocation}/albums/${req.params.id}`;
				await albumRepository.save(entity);
				break;
			case "artists": {
				entity.artistPhoto = `${storageLocation}/artists/${req.params.id}`;
				await artistRepository.save(entity);
				break;
			}
			case "tracks": {
				entity.pathTrack = `${storageLocation}/tracks/${req.params.id}`;
				await artistRepository.save(entity);
				break;
			}
			default:
				throw new Error("File not allowed");
		}
		res.status(201).json(entity);
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const putFile = async (req: Request, res: Response) => {
	try {
		const entity = res.locals.entity;
		switch (req.params.folder) {
			case "albums":
				entity.albumCover = `${storageLocation}/albums/${req.params.id}`;
				await albumRepository.save(entity);
				break;
			case "artists": {
				entity.artistPhoto = `${storageLocation}/artists/${req.params.id}`;
				await artistRepository.save(entity);
				break;
			}
			case "tracks": {
				entity.pathTrack = `${storageLocation}/tracks/${req.params.id}`;
				await artistRepository.save(entity);
				break;
			}
			default:
				res.status(404).json({ error: `Entity ${req.params.folder} has not been found.` });
		}
		res.status(201).json(res.locals.entity);
	} catch (error) {
		handleHttp(res, error, "ERROR_PUT_IMAGE (PUT)");
	}
};

const deleteFile = async (req: Request, res: Response) => {
	try {
		const entity = res.locals.entity;
		let pathFile = "";
		if (entity instanceof Album) {
			if (!entity.albumCover) {
				return res.status(404).json({ msg: `Don't exists cover for the album ${entity.titleAlbum}` });
			}
			pathFile = path.join(__dirname, `../uploads/albums/${req.params.id}.jpg`);
			entity.albumCover = "";
			await albumRepository.save(entity);
		} else if (entity instanceof Artist) {
			if (!entity.artistPhoto) {
				return res.status(404).json({ msg: `Don't exists photo for the artist/group ${entity.stageName}` });
			}
			pathFile = path.join(__dirname, `../uploads/artists/${req.params.id}.jpg`);
			entity.artistPhoto = "";
			await artistRepository.save(entity);
		} else if (entity instanceof Track) {
			if (!entity.pathTrack) {
				return res.status(404).json({ msg: `Don't exists the audio for the track ${entity.titleTrack}` });
			}
			pathFile = path.join(__dirname, `../uploads/tracks/${req.params.id}.mp3`);
			entity.pathTrack = "";
			await trackRepository.save(entity);
		} else {
			throw new Error("Missing error in delete");
		}
		unlink(pathFile, (err) => {
			if (err) {
				throw err;
			}
		});
		res.status(204).json({ msg: "Delete success" });
	} catch (error) {
		handleHttp(res, error, "ERROR_DELETE_FILE (DELETE)");
	}
};

export { getFile, uploadFile, putFile, deleteFile };
