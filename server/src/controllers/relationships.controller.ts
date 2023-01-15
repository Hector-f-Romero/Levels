import { Request, Response } from "express";

import { handleHttp } from "../helpers/error.handle";
import { Album, Artist, User, Playlist, Track } from "../entities";
import { AppDataSource } from "../config/mysql";

const albumRepository = AppDataSource.getRepository(Album);
const artistRepository = AppDataSource.getRepository(Artist);
const trackRepository = AppDataSource.getRepository(Track);

const addPlaylistToUser = async (req: Request, res: Response) => {
	try {
		const { idPlaylist, idUser } = req.body;
		const user = await User.findOneBy({ idUser });

		if (!user) {
			return res.status(404).json({ msg: `Don't exist user in BD with the id ${idUser}` });
		}

		const playlist = await Playlist.findOneBy({ idPlaylist });

		if (!playlist) {
			return res.status(404).json({ msg: `Don't exist playlist in BD with the id ${idPlaylist}` });
		}
		user.playlists = [playlist];
		await user.save();
		return res.status(201).json({ msg: `Playlist assigned successfully.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_ADD_PLAYLIST_TO_USER (POST)");
	}
};

const addAlbumToArtist = async (req: Request, res: Response): Promise<void> => {
	const { idAlbum, idArtist } = req.body;
	const album = await albumRepository.findOneBy({ idAlbum });

	if (!album) {
		res.status(404).json({ msg: `Don't exist album in BD with the id ${idAlbum}` });
		return;
	}

	const artist = await artistRepository.findOneBy({ idArtist });

	if (!artist) {
		res.status(404).json({ msg: `Don't exist artist in BD with the id ${idArtist}` });
		return;
	}

	album.artists = [artist];
	await albumRepository.save(album);
	res.status(201).json({ msg: `Artist assigned successfully.` });
};

const addFeaturings = async (req: Request, res: Response) => {
	console.log(req.body);
	res.status(200).json({ msg: "ok" });
};

const getAlbumWithTracks = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const selectColumns = [
			"album.albumCover",
			"album.idAlbum",
			"album.label",
			"album.releaseDate",
			"album.titleAlbum",
			"albumArt.stageName",
			"albumArt.idArtist",
			"track.duration",
			"track.idTrack",
			"track.pathTrack",
			"track.releaseDate",
			"track.titleTrack",
			"artists.idArtist",
			"artists.stageName",
		];

		const albumTracks = await albumRepository
			.createQueryBuilder("album")
			.innerJoinAndSelect("album.tracks", "track")
			.leftJoinAndSelect("track.artists", "artists")
			.leftJoinAndSelect("album.artists", "albumArt")
			.select(selectColumns)
			.where("album.idAlbum = :idAlbum", { idAlbum: Number(id) })
			.getMany();
		res.status(200).json(albumTracks);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_ALL_INFO");
	}
};

export { addFeaturings, addPlaylistToUser, addAlbumToArtist, getAlbumWithTracks };
