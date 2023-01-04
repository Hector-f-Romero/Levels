import { Request, Response } from "express";
import { Artist, Track } from "../entities/index.entity";
import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";

const getLastTracks = (req: Request, res: Response) => {
	res.status(200).json({ msg: "Últimas 10 canciones" });
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
		// track?.artists =
		if (!track) {
			return res.status(201).json({ msg: "ok" });
		}

		const idFeaturings = featurings.map((feat: { value: number; text: string }) => feat.value);
		// console.log(trackInsert.raw.insertId);
		// console.log(idFeaturings);
		// console.log(featurings);
		const featuringsData = await AppDataSource.createQueryBuilder()
			.select("artist")
			.from(Artist, "artist")
			.where("artist.idArtist IN (:...featuringArtistsList)", { featuringArtistsList: idFeaturings })
			.getMany();

		console.log(track);
		console.log(featuringsData);
		track.artists = featuringsData;
		track.save();
		// await AppDataSource.createQueryBuilder()
		// 	.relation(Artist, "featuringArtists")
		// 	.of(track.raw.insertId)
		// 	.add(featuringsData[0]);
		// console.log(track);

		res.status(201).json({ msg: "ok" });
	} catch (error) {
		handleHttp(res, error, "ERROR_CREATE_GENRE (POST)");
	}
};

export { getLastTracks, createTrack };
