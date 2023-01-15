import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumWithTrackRequest } from "../api/album.api";
import TrackCard from "../components/TrackCard";
import TrackElement from "../components/TrackElement";

const AlbumInfo = () => {
	const [albumData, setAlbumData] = useState({ tracks: [] });
	const [loading, setLoading] = useState(false);

	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		getAlbumData();
	}, []);

	const getAlbumData = async () => {
		const res = await getAlbumWithTrackRequest(id);
		console.log(res);
		setAlbumData(res);
		setLoading(false);
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="card-data-container">
			<img src={albumData.albumCover} alt="" />
			<div className="card-data-info">
				<h1>{albumData.titleAlbum}</h1>
				<h2>Artist name</h2>
				<h2>Label: {albumData.label}</h2>
				<h3>Release date: {albumData.releaseDate}</h3>
			</div>
			<div className="track-list">
				{albumData.tracks.map((track, index) => {
					// console.log(track);
					return (
						<TrackElement
							key={track.idTrack}
							data={track}
							primaryArtist={albumData.artists}
							index={index + 1}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default AlbumInfo;
