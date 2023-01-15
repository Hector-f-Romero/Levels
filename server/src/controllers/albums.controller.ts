import { Request, Response } from "express";

import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";
import { Album } from "../entities/Album";

const albumRepository = AppDataSource.getRepository(Album);

const getAlbums = async (req: Request, res: Response): Promise<void> => {
	try {
		const albums = await albumRepository.find();
		res.status(200).json(albums);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_ALBUMS (GET)");
	}
};

const getAlbum = async (req: Request, res: Response) => {
	try {
		console.log(req.params.id);
		const album = await albumRepository.findOneBy({ idAlbum: Number(req.params.id) });

		if (!album) {
			return res.status(404).json({ msg: `Don't exist users in BD with the id ${req.params.id}` });
		}

		return res.status(200).json(album);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const createAlbum = async (req: Request, res: Response): Promise<void> => {
	try {
		const { titleAlbum, releaseDate, label } = req.body;
		const album = albumRepository.create({ titleAlbum, releaseDate, label });
		await albumRepository.save(album);
		res.status(201).json(album);
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
				"album.albumCover",
				"artist.idArtist",
				"artist.stageName",
			])
			.getMany();
		return res.status(200).json(albums);
		// res.json({ msg: "hola" });
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_ALBUMS_ARTIST");
	}
};

export { getAlbums, getAlbum, getAlbumsWithArtist, createAlbum, updateAlbum, deleteAlbum };
