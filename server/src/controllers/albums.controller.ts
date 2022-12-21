import { Request, Response } from "express";

import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";
import { Album } from "../entities/Album";

const getAlbums = async (req: Request, res: Response): Promise<void> => {
	try {
		const albums = await Album.find();
		res.status(200).json(albums);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_ALBUMS (GET)");
	}
};

const getAlbum = async (req: Request, res: Response) => {
	try {
		console.log(req.params.id);
		const album = await Album.findOne({
			where: [
				{
					idAlbum: Number(req.params.id),
				},
			],
		});

		if (!album) {
			return res.status(404).json({ msg: `Don't exist users in BD with the id ${req.params.id}` });
		}

		return res.status(200).json({ album });
	} catch (error) {
		return res.status(500).json(error);
	}
};

const createAlbum = async (req: Request, res: Response): Promise<void> => {
	try {
		const { titleAlbum, releaseDate, label, coverAlbum } = req.body;

		const album = new Album();
		album.titleAlbum = titleAlbum;
		album.releaseDate = releaseDate;
		album.label = label;
		album.coverAlbum = coverAlbum;
		album.save();

		res.status(201).json({ msg: `Album ${titleAlbum} created successfully .`, album });
	} catch (error) {
		handleHttp(res, error, "ERROR_CREATE_ALBUM (POST)");
	}
};

const updateAlbum = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { titleAlbum, releaseDate, label, coverAlbum } = req.body;
		await AppDataSource.createQueryBuilder()
			.update(Album)
			.set({ titleAlbum, releaseDate, label, coverAlbum })
			.where({ idAlbum: id })
			.execute();
		res.status(200).json({ msg: `Album ${titleAlbum} updated correctly.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_UPDATE_ALBUM (PATCH)");
	}
};

const deleteAlbum = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await AppDataSource.createQueryBuilder().delete().from(Album).where({ idAlbum: id }).execute();
		return res.status(204).json({ msg: `Album with id ${id} deleted correctly.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_DELETE_ALBUM (DELETE)");
	}
};

const getAlbumsWithArtist = async (req: Request, res: Response) => {
	try {
		const albums = await AppDataSource.getRepository(Album)
			.createQueryBuilder("album")
			.leftJoinAndSelect("album.artists", "artist")
			.select([
				"album.idAlbum",
				"album.titleAlbum",
				"album.releaseDate",
				"album.label",
				"album.coverAlbum",
				"artist.idArtist",
				"artist.stageName",
			])
			.getMany();
		//

		/**"idAlbum": 2,
        "titleAlbum": "Fórmula, vol. 2",
        : 2014,
        : "Sony Music Latin",
        : "img2.jpg",
        "album.artists": [
            {
                "idArtist": 5,
                "namesArtist": "Félix Gerardo",
                "lastNamesArtist": "Ortiz Torres",
                "stageName": "Zion",
                "typeArtist": "Artist",
                "bornDate": "1981-08-05",
                "countryOrigin": "Puerto Rico",
                "artistPhoto": "img7.jpg"
            }
        ] */

		return res.status(200).json(albums);
		// res.json({ msg: "hola" });
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_ALBUMS_ARTIST");
	}
};

export { getAlbums, getAlbum, getAlbumsWithArtist, createAlbum, updateAlbum, deleteAlbum };
