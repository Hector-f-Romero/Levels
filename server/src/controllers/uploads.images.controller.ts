import path from "path";
import { writeFileSync, existsSync, unlink } from "node:fs";
import sharp from "sharp";

import { Request, Response } from "express";
import { AppDataSource } from "../config/mysql";
import { Album, Artist, Track } from "../entities";

import { handleHttp } from "../helpers/error.handle";
import { unlinkSync } from "fs";

const albumRepository = AppDataSource.getRepository(Album);
const trackRepository = AppDataSource.getRepository(Track);
const artistRepository = AppDataSource.getRepository(Artist);
const storageLocationURL = `${process.env.FILES_STORAGE_URI}/api/uploads`;

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
			if (folder === "albums") {
				pathFile = path.join(__dirname, `../uploads/albums/Not-album-image.jpg`);
			} else if (folder === "artists") {
				pathFile = path.join(__dirname, `../uploads/artists/Not-artist.jpg`);
			} else {
				console.log("Error not validate");
			}
			res.sendFile(pathFile);
		}
	} catch (error) {
		handleHttp(res, error, "GET_IMAGE (GET)");
	}
};

const getAlbumCover = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const album = await albumRepository.findOneBy({ idAlbum: Number(id) });

		if (!album) {
			res.status(404).json({ error: `Not exists album with id ${id}.` });
			return;
		}

		const pathNotImage = path.join(__dirname, `../uploads/albums/Not-album-image.jpg`);

		if (!album.albumCover || album.albumCover === `${storageLocationURL}/albums/Not-album-image.jpg`) {
			res.status(200).sendFile(pathNotImage);
			return;
		}

		const pathAlbumCover = path.join(__dirname, `../uploads/albums/${id}.jpg`);

		if (existsSync(pathAlbumCover)) {
			res.status(200).sendFile(pathAlbumCover);
		} else {
			res.status(404).sendFile(pathNotImage);
		}
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const uploadAlbumCover = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const album = await albumRepository.findOneBy({ idAlbum: Number(id) });

		if (!album) {
			res.status(404).json({ error: `Not exists album with id ${id}.` });
			return;
		}

		if (!req.file) {
			album.albumCover = `${storageLocationURL}/albums/Not-album-image.jpg`;
			await albumRepository.save(album);
			res.status(201).json(album);
			return;
		}

		const storagePath = path.join(__dirname, `../uploads/albums/${id}.jpg`);
		await sharp(req.file.buffer).resize(240, 240, { fit: "fill" }).jpeg({ quality: 100 }).toFile(storagePath);
		album.albumCover = `${storageLocationURL}/albums/${req.params.id}`;
		await albumRepository.save(album);
		res.status(200).sendFile(storagePath);
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const putAlbumCover = async (req: Request, res: Response) => {
	try {
		console.log(req.file);
		if (!req.file) {
			res.status(400).json({ error: "Don't exist file in the request." });
			return;
		}

		const { id } = req.params;
		const album = await albumRepository.findOneBy({ idAlbum: Number(id) });

		if (!album) {
			res.status(404).json({ error: `Not exists album with id ${id}.` });
			return;
		}

		const storagePath = path.join(__dirname, `../uploads/albums/${id}.jpg`);
		await sharp(req.file.buffer).resize(240, 240, { fit: "fill" }).jpeg({ quality: 100 }).toFile(storagePath);
		album.albumCover = `${storageLocationURL}/albums/${req.params.id}`;
		await albumRepository.save(album);
		res.status(200).sendFile(storagePath);
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const deleteCoverAlbum = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const album = await albumRepository.findOneBy({ idAlbum: Number(id) });

		if (!album) {
			res.status(404).json({ error: `Not exists album with id ${id}.` });
			return;
		}

		if (!album.albumCover) {
			res.status(404).json({ error: `Don't exists path for album cover ${album.titleAlbum}` });
			return;
		}

		if (album.albumCover === `${storageLocationURL}/albums/Not-album-image.jpg`) {
			res.status(200).json({ msg: `${album.titleAlbum} doesn't have album cover.` });
			return;
		}

		const pathAlbumCover = path.join(__dirname, `../uploads/albums/${id}.jpg`);

		unlinkSync(pathAlbumCover);
		album.albumCover = `${storageLocationURL}/albums/Not-album-image.jpg`;
		await albumRepository.save(album);
		res.status(204).json();
	} catch (error) {
		handleHttp(res, error, "ERROR_DELETE_FILE (DELETE)");
	}
};

const putFile = async (req: Request, res: Response) => {
	try {
		const entity = res.locals.entity;
		switch (req.params.folder) {
			case "albums":
				entity.albumCover = `${storageLocationURL}/albums/${req.params.id}`;
				await albumRepository.save(entity);
				break;
			case "artists": {
				entity.artistPhoto = `${storageLocationURL}/artists/${req.params.id}`;
				await artistRepository.save(entity);
				break;
			}
			case "tracks": {
				entity.pathTrack = `${storageLocationURL}/tracks/${req.params.id}`;
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
export { getFile, getAlbumCover, uploadAlbumCover, putAlbumCover, deleteCoverAlbum };
