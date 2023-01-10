import path from "path";
import { unlinkSync, existsSync } from "fs";
import sharp from "sharp";

import { Request, Response } from "express";
import { AppDataSource } from "../config/mysql";
import { Album } from "../entities";
import { handleHttp } from "../helpers/error.handle";

const albumRepository = AppDataSource.getRepository(Album);
const storageLocationURL = `${process.env.FILES_STORAGE_URI}/api/uploads`;

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
			res.status(201).json({ msg: `Set generic image for album cover of ${album.titleAlbum}` });
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

export { getAlbumCover, uploadAlbumCover, putAlbumCover, deleteCoverAlbum };
