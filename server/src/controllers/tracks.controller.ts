import { Request, Response } from "express";
import { Artist, Track } from "../entities";
import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";

const trackRepository = AppDataSource.getRepository(Track);

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
		const trackInsert = await AppDataSource.createQueryBuilder().insert().into(Track).values([trackData]).execute();
		const track = await AppDataSource.createQueryBuilder()
			.select("track")
			.from(Track, "track")
			.where("track.idTrack = :idTrack", {
				idTrack: trackInsert.raw.insertId,
			})
			.getOne();
		if (!track) {
			return res.status(201).json({ msg: "ok" });
		}

		const idFeaturings = featurings.map((feat: { value: number; text: string }) => feat.value);

		const featuringsData = await AppDataSource.createQueryBuilder()
			.select("artist")
			.from(Artist, "artist")
			.where("artist.idArtist IN (:...featuringArtistsList)", { featuringArtistsList: idFeaturings })
			.getMany();

		console.log(track);
		console.log(featuringsData);
		track.artists = featuringsData;
		track.save();
		res.status(201).json({ msg: "ok" });
	} catch (error) {
		handleHttp(res, error, "ERROR_CREATE_GENRE (POST)");
	}
};

export { getTracks, getLastTracks, createTrack };
