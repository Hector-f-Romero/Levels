import path from "path";
import { unlinkSync, existsSync } from "fs";

import { Request, Response } from "express";
import { AppDataSource } from "../config/mysql";
import { Track } from "../entities";
import { handleHttp } from "../helpers/error.handle";

const trackRepository = AppDataSource.getRepository(Track);
const storageLocationURL = `${process.env.FILES_STORAGE_URI}/api/uploads`;

const getTrackFile = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const track = await trackRepository.findOneBy({ idTrack: Number(id) });

		if (!track) {
			res.status(404).json({ error: `Not exists track with id ${id}.` });
			return;
		}

		if (!track.pathTrack) {
			res.status(404).json({ msg: `Not exists audio file for ${track.titleTrack}.` });
			return;
		}

		const pathTrackFile = path.join(__dirname, `../uploads/tracks/${id}.mp3`);

		if (existsSync(pathTrackFile)) {
			res.status(200).sendFile(pathTrackFile);
		} else {
			res.status(404).json({ msg: `Not exists audio file for ${track.titleTrack}.` });
		}
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const uploadTrackFile = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const track = await trackRepository.findOneBy({ idTrack: Number(id) });

		if (!track) {
			res.status(404).json({ error: `Not exists track with id ${id}.` });
			return;
		}

		if (!req.file) {
			res.status(400).json({ error: "Not exists file in the request." });
			return;
		}

		const storagePath = path.join(__dirname, `../uploads/tracks/${id}.jpg`);
		track.pathTrack = `${storageLocationURL}/tracks/${req.params.id}`;
		await trackRepository.save(track);
		res.status(200).sendFile(storagePath);
	} catch (error) {
		handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	}
};

const putTrackFile = async (req: Request, res: Response) => {
	// try {
	// 	console.log(req.file);
	// 	if (!req.file) {
	// 		res.status(400).json({ error: "Don't exist file in the request." });
	// 		return;
	// 	}
	// 	const { id } = req.params;
	// 	const track = await trackRepository.findOneBy({ idAlbum: Number(id) });
	// 	if (!track) {
	// 		res.status(404).json({ error: `Not exists track with id ${id}.` });
	// 		return;
	// 	}
	// 	const storagePath = path.join(__dirname, `../uploads/tracks/${id}.jpg`);
	// 	await sharp(req.file.buffer).resize(240, 240, { fit: "fill" }).jpeg({ quality: 100 }).toFile(storagePath);
	// 	track.track = `${storageLocationURL}/tracks/${req.params.id}`;
	// 	await trackRepository.save(track);
	// 	res.status(200).sendFile(storagePath);
	// } catch (error) {
	// 	handleHttp(res, error, "ERROR_UPLOAD_IMAGE (POST)");
	// }
};

const deleteTrackFile = async (req: Request, res: Response) => {
	// try {
	// 	const { id } = req.params;
	// 	const track = await trackRepository.findOneBy({ idAlbum: Number(id) });
	// 	if (!track) {
	// 		res.status(404).json({ error: `Not exists track with id ${id}.` });
	// 		return;
	// 	}
	// 	if (!track.track) {
	// 		res.status(404).json({ error: `Don't exists path for track cover ${track.titleAlbum}` });
	// 		return;
	// 	}
	// 	if (track.track === `${storageLocationURL}/tracks/Not-track-image.jpg`) {
	// 		res.status(200).json({ msg: `${track.titleAlbum} doesn't have track cover.` });
	// 		return;
	// 	}
	// 	const pathAlbumCover = path.join(__dirname, `../uploads/tracks/${id}.jpg`);
	// 	unlinkSync(pathAlbumCover);
	// 	track.track = `${storageLocationURL}/tracks/Not-track-image.jpg`;
	// 	await trackRepository.save(track);
	// 	res.status(204).json();
	// } catch (error) {
	// 	handleHttp(res, error, "ERROR_DELETE_FILE (DELETE)");
	// }
};

export { getTrackFile, uploadTrackFile, putTrackFile, deleteTrackFile };
