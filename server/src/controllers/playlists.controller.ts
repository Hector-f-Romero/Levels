import { Request, Response } from "express";
import { Playlist } from "../entities/Playlist.entity";
// import { Playlists_Users } from "../entities/playlist_Users.entity";

// Bloqueado en esta parte, no sé cómo continuar con TypeORM haciendo la relación de muchos a muchos manualmente.
const createPlaylist = async (req: Request, res: Response) => {
	try {
		const { namePlaylist } = req.body;
		console.log(req.body);

		const playlist = new Playlist();
		// const playlistUser = new Playlists_Users();
		// playlistUser.playlist = 1;
		playlist.namePlaylist = namePlaylist;

		res.status(200).json({ msg: `Creación de la playlist ${namePlaylist} exitosa.` });
	} catch (error) {
		console.log(error);
	}
};

export { createPlaylist };
