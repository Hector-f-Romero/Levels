import React from "react";
import { transformDurationToMinutes } from "../helpers/normalize-data";

const TrackElement = (props) => {
	const { duration, idTrack, pathTrack, releaseDate, titleTrack, artists } = props.data;
	const durationInMinutes = transformDurationToMinutes(duration);

	const handlePlayTrack = () => {
		console.log("hola");
		console.log(props.primaryArtist);
	};

	return (
		<div className="track-element" onClick={handlePlayTrack}>
			<span>{props.index}</span>
			<div className="titleTrack">
				<h2>{titleTrack}</h2>
				{props.primaryArtist.map((art) => (
					<span key={art.idArtist}>{art.stageName}</span>
				))}
				{artists.map((art) => (
					<span key={art.idArtist}>, {art.stageName}</span>
				))}
			</div>
			<h2>{releaseDate}</h2>
			<h2>{durationInMinutes}</h2>
		</div>
	);
};

export default TrackElement;
