import { Request, Response } from "express";
import { Artist, Track } from "../entities";
import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";

const trackRepository = AppDataSource.getRepository(Track);
const artistRepository = AppDataSource.getRepository(Artist);

const storageLocationURL = `${process.env.FILES_STORAGE_URI}/api/uploads`;

const getLastTracks = (req: Request, res: Response) => {
	res.status(200).json({ msg: "Últimas 10 canciones" });
};

const getTracks = (req: Request, res: Response) => {
	try {
		const tracks = trackRepository.find();

		if (!tracks) {
			res.status(404).json({ msg: "Not exist tracks in BD." });
		}

		res.status(200).json(tracks);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_TASKS");
	}
};

const createTrack = async (req: Request, res: Response) => {
	try {
		const { trackData, featurings } = req.body;
		const { duration, idAlbum, idGenre, idPrimaryArtist, releaseDate, titleTrack } = trackData;

		const track = trackRepository.create({ duration, idAlbum, idGenre, idPrimaryArtist, releaseDate, titleTrack });

		if (featurings.length > 0) {
			console.log(featurings);
			const featuringArtists = await artistRepository
				.createQueryBuilder("artist")
				.where("artist.idArtist IN (:...featuringArtists)", { featuringArtists: featurings })
				.getMany();
			track.artists = featuringArtists;
		}

		await trackRepository.save(track);
		track.pathTrack = `${storageLocationURL}/tracks/${track.idTrack}`;
		await trackRepository.save(track);
		res.status(201).json(track);
	} catch (error) {
		handleHttp(res, error, "ERROR_CREATE_GENRE (POST)");
	}
};

export { getTracks, getLastTracks, createTrack };
