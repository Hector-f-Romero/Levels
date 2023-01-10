import path from "path";
import { unlinkSync, existsSync } from "fs";
import sharp from "sharp";

import { Request, Response } from "express";
import { AppDataSource } from "../config/mysql";
import { Artist } from "../entities";
import { handleHttp } from "../helpers/error.handle";

const artistRepository = AppDataSource.getRepository(Artist);
const storageLocationURL = `${process.env.FILES_STORAGE_URI}/api/uploads`;

const getArtistPhoto = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const artist = await artistRepository.findOneBy({ idArtist: Number(id) });

		if (!artist) {
			res.status(404).json({ error: `Not exists album with id ${id}.` });
			return;
		}

		const pathNotImage = path.join(__dirname, `../uploads/artists/Not-found-artist-image.jpg`);

		if (!artist.artistPhoto || artist.artistPhoto === `${storageLocationURL}/artists/Not-found-artist-image.jpg`) {
			res.status(200).sendFile(pathNotImage);
			return;
		}

		const pathArtistPhoto = path.join(__dirname, `../uploads/artists/${id}.jpg`);

		if (existsSync(pathArtistPhoto)) {
			res.status(200).sendFile(pathArtistPhoto);
		} else {
			res.status(404).sendFile(pathNotImage);
		}
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const uploadArtistPhoto = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const artist = await artistRepository.findOneBy({ idArtist: Number(id) });

		if (!artist) {
			res.status(404).json({ error: `Not exists album with id ${id}.` });
			return;
		}

		if (!req.file) {
			artist.artistPhoto = `${storageLocationURL}/artists/Not-found-artist-image.jpg`;
			await artistRepository.save(artist);
			res.status(201).json({ msg: `Set generic image for album cover of ${artist.stageName}` });
			return;
		}
		console.log(req.file);
		const storagePath = path.join(__dirname, `../uploads/artists/${id}.jpg`);
		await sharp(req.file.buffer).resize(240, 240, { fit: "fill" }).jpeg({ quality: 100 }).toFile(storagePath);
		artist.artistPhoto = `${storageLocationURL}/artists/${req.params.id}`;
		await artistRepository.save(artist);
		res.status(200).sendFile(storagePath);
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const putArtistPhoto = async (req: Request, res: Response) => {
	try {
		if (!req.file) {
			res.status(400).json({ error: "Don't exist file in the request." });
			return;
		}

		const { id } = req.params;
		const artist = await artistRepository.findOneBy({ idArtist: Number(id) });

		if (!artist) {
			res.status(404).json({ error: `Not exists album with id ${id}.` });
			return;
		}

		const storagePath = path.join(__dirname, `../uploads/artists/${id}.jpg`);
		await sharp(req.file.buffer).resize(240, 240, { fit: "fill" }).jpeg({ quality: 100 }).toFile(storagePath);
		artist.artistPhoto = `${storageLocationURL}/artists/${req.params.id}`;
		await artistRepository.save(artist);
		res.status(200).sendFile(storagePath);
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const deleteArtistPhoto = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const artist = await artistRepository.findOneBy({ idArtist: Number(id) });

		if (!artist) {
			res.status(404).json({ error: `Not exists album with id ${id}.` });
			return;
		}

		if (!artist.artistPhoto) {
			res.status(404).json({ error: `Don't exists path for album cover ${artist.stageName}` });
			return;
		}

		if (artist.artistPhoto === `${storageLocationURL}/artists/Not-found-artist-image.jpg`) {
			res.status(200).json({ msg: `${artist.stageName} doesn't have album cover.` });
			return;
		}

		const pathAlbumCover = path.join(__dirname, `../uploads/artists/${id}.jpg`);

		unlinkSync(pathAlbumCover);
		artist.artistPhoto = `${storageLocationURL}/artists/${id}`;
		await artistRepository.save(artist);
		res.status(204).json();
	} catch (error) {
		handleHttp(res, error, "ERROR_DELETE_FILE (DELETE)");
	}
};

export { getArtistPhoto, uploadArtistPhoto, putArtistPhoto, deleteArtistPhoto };
