import { Request, Response } from "express";

import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";
import { Genre } from "../entities";

const getGenres = async (req: Request, res: Response): Promise<void> => {
	try {
		const genres = await Genre.find();
		res.status(200).json(genres);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_GENRES (GET)");
	}
};

const getGenre = async (req: Request, res: Response) => {
	try {
		const genre = await Genre.findOneBy({
			idGenre: Number(req.params.id),
		});

		if (!genre) {
			return res.status(404).json({ msg: `Don't exist genre in BD with the id ${req.params.id}` });
		}

		return res.status(200).json(genre);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const createGenre = async (req: Request, res: Response): Promise<void> => {
	try {
		const { nameGenre } = req.body;
		const genre = new Genre();
		genre.nameGenre = nameGenre;

		genre.save();

		res.status(201).json(genre);
	} catch (error) {
		handleHttp(res, error, "ERROR_CREATE_GENRE (POST)");
	}
};

// const updateArtist = async (req: Request, res: Response) => {
// 	try {
// 		const id = req.params.id;
// 		const { titleAlbum, releaseDate, label, coverAlbum } = req.body;
// 		await AppDataSource.createQueryBuilder()
// 			.update(Artist)
// 			.set({ titleAlbum, releaseDate, label, coverAlbum })
// 			.where({ idAlbum: id })
// 			.execute();
// 		res.status(200).json({ msg: `Album ${titleAlbum} updated correctly.` });
// 	} catch (error) {
// 		handleHttp(res, error, "ERROR_UPDATE_ALBUM (PATCH)");
// 	}
// };

// const deleteArtist = async (req: Request, res: Response) => {
// 	try {
// 		const id = req.params.id;
// 		await AppDataSource.createQueryBuilder().delete().from(Artist).where({ idArtist: id }).execute();
// 		return res.status(201).json({ msg: `Artist/Group with id ${id} deleted correctly.` });
// 	} catch (error) {
// 		handleHttp(res, error, "ERROR_DELETE_ALBUM (DELETE)");
// 	}
// };

export { getGenre, getGenres, createGenre };
