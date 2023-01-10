import { Request, Response } from "express";

import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";
import { Artist } from "../entities/Artist";

const artistRepository = AppDataSource.getRepository(Artist);

const getArtists = async (req: Request, res: Response): Promise<void> => {
	try {
		const artists = await Artist.find();
		res.status(200).json(artists);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_ARTISTS (GET)");
	}
};

const getArtist = async (req: Request, res: Response) => {
	try {
		console.log(req.params.id);
		const album = await Artist.findOneBy({
			idArtist: Number(req.params.id),
		});

		if (!album) {
			return res.status(404).json({ msg: `Don't exist users in BD with the id ${req.params.id}` });
		}

		return res.status(200).json({ album });
	} catch (error) {
		return res.status(500).json(error);
	}
};

const createArtist = async (req: Request, res: Response): Promise<void> => {
	try {
		const { namesArtist, lastNamesArtist, stageName, typeArtist, bornDate, countryOrigin } = req.body;
		const artist = artistRepository.create({
			namesArtist,
			lastNamesArtist,
			stageName,
			typeArtist,
			bornDate,
			countryOrigin,
		});

		await artistRepository.save(artist);

		res.status(201).json(artist);
	} catch (error) {
		handleHttp(res, error, "ERROR_CREATE_ARTIST (POST)");
	}
};

const updateArtist = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { titleAlbum, releaseDate, label, coverAlbum } = req.body;
		await AppDataSource.createQueryBuilder()
			.update(Artist)
			.set({ titleAlbum, releaseDate, label, coverAlbum })
			.where({ idAlbum: id })
			.execute();
		res.status(200).json({ msg: `Album ${titleAlbum} updated correctly.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_UPDATE_ALBUM (PATCH)");
	}
};

const deleteArtist = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await AppDataSource.createQueryBuilder().delete().from(Artist).where({ idArtist: id }).execute();
		return res.status(201).json({ msg: `Artist/Group with id ${id} deleted correctly.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_DELETE_ALBUM (DELETE)");
	}
};

export { getArtists, getArtist, createArtist, updateArtist, deleteArtist };
