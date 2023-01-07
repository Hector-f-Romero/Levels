import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/mysql";
import { Album, Artist, Track } from "../entities";

const albumRepository = AppDataSource.getRepository(Album);
const trackRepository = AppDataSource.getRepository(Track);
const artistRepository = AppDataSource.getRepository(Artist);

/**
 * Verify if the ID of the entity exists in the DB tables.
 * @param req
 * @param res
 * @param next
 * @returns
 */
const fileIdAndFolderExists = async (req: Request, res: Response, next: NextFunction) => {
	let entity: unknown;
	switch (req.params.folder) {
		case "albums":
			entity = await albumRepository.findOneBy({ idAlbum: Number(req.params.id) });
			break;
		case "artists": {
			entity = await artistRepository.findOneBy({ idArtist: Number(req.params.id) });
			break;
		}
		case "tracks": {
			entity = await trackRepository.findOneBy({ idTrack: Number(req.params.id) });
			break;
		}
		default:
			return res.status(400).json({ msg: `Don't exists entity ${req.params.folder}` });
	}
	if (!entity) {
		return res.status(404).json({ msg: `Don't exists id ${req.params.id} in ${req.params.folder} ` });
	}
	// Save the data of entity
	res.locals.entity = entity;
	next();
};

/**
 * Verify if at least one file was sent in the request
 * @param req
 * @param res
 * @param next
 * @returns
 */
const fileExists = (req: Request, res: Response, next: NextFunction) => {
	if (!req.file) {
		return res.status(404).json({ msg: `Don't exists file or files into request.` });
	}
	next();
};

export { fileExists, fileIdAndFolderExists };
