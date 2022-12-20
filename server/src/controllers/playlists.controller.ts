import { Request, Response } from "express";

import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";
import { Playlist } from "../entities/Playlist";
import { User } from "../entities/User";

const getPlaylists = async (req: Request, res: Response) => {
	try {
		const playlistS = await Playlist.find();
		res.status(200).json(playlistS);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_PLAYLISTS (GET)");
	}
};

const getPlaylist = async (req: Request, res: Response) => {
	try {
		const playlist = await Playlist.findOne({
			where: [
				{
					idPlaylist: Number(req.params.id),
				},
			],
		});

		if (!playlist) {
			return res.status(404).json({ msg: `Don't exist playlist in BD with the id ${req.params.id}` });
		}

		return res.status(200).json({ playlist });
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_PLAYLIST (GET)");
	}
};

const createPlaylist = async (req: Request, res: Response) => {
	try {
		const { namePlaylist } = req.body;
		const playlist = new Playlist();
		playlist.namePlaylist = namePlaylist;
		playlist.save();

		return res.status(201).json({ msg: `Playlist with title ${namePlaylist} created successfully .` });
	} catch (error) {
		handleHttp(res, error, "ERROR_CREATE_PLAYLIST (POST)");
	}
};

const updatePlaylist = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { namePlaylist } = req.body;
		await AppDataSource.createQueryBuilder()
			.update(Playlist)
			.set({ namePlaylist })
			.where({ idPlaylist: id })
			.execute();
		res.status(200).json({ msg: `Album ${namePlaylist} updated correctly.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_UPDATE_PLAYLIST (PATCH)");
	}
};

const deletePlaylist = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await AppDataSource.createQueryBuilder().delete().from(Playlist).where({ idPlaylist: id }).execute();
		return res.status(201).json({ msg: `Playlist with id ${id} deleted correctly.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_DELETE_PLAYLIST (DELETE)");
	}
};

const addPlaylistToUser = async (req: Request, res: Response) => {
	try {
		const { idPlaylist, idUser } = req.body;
		const user = await User.findOne({
			where: [
				{
					idUser,
				},
			],
		});

		const playlist = await Playlist.findOne({
			where: [
				{
					idPlaylist,
				},
			],
		});

		if (!user) {
			return res.status(404).json({ msg: `Don't exist user in BD with the id ${idUser}` });
		}

		if (!playlist) {
			return res.status(404).json({ msg: `Don't exist playlist in BD with the id ${idPlaylist}` });
		}
		console.log("-----------------------");
		console.log(user);
		console.log(playlist);

		user.playlists = [playlist];
		console.log("-----------------------");
		console.log(user.playlists);
		await user.save();
		return res.status(201).json({ msg: `Playlist assigned successfully.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_ADD_PLAYLIST_TO_USER (POST)");
	}
};

export { getPlaylists, getPlaylist, createPlaylist, updatePlaylist, deletePlaylist, addPlaylistToUser };
