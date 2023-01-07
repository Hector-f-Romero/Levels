import { Request, Response } from "express";

import { handleHttp } from "../helpers/error.handle";
import { Album, Artist, User, Playlist } from "../entities";

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

const addAlbumToArtist = async (req: Request, res: Response) => {
	const { idAlbum, idArtist } = req.body;
	const album = await Album.findOneBy({ idAlbum });

	if (!album) {
		return res.status(404).json({ msg: `Don't exist album in BD with the id ${idAlbum}` });
	}

	const artist = await Artist.findOneBy({ idArtist });

	if (!artist) {
		return res.status(404).json({ msg: `Don't exist artist in BD with the id ${idArtist}` });
	}
	album.artists = [artist];
	console.log(album.artists);
	await album.save();
	return res.status(201).json({ msg: `Artist assigned successfully.` });
};

const addFeaturings = async (req: Request, res: Response) => {
	console.log(req.body);
	res.status(200).json({ msg: "ok" });
};

export { addFeaturings, addPlaylistToUser, addAlbumToArtist };
