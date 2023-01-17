import React, { useContext } from "react";

import { DataContext } from "../context/dataContext";
import { transformDurationToMinutes } from "../helpers/normalize-data";

const TrackElement = (props) => {
	const { duration, idTrack, pathTrack, releaseDate, titleTrack, artists } = props.data;
	const { track, setTrack } = useContext(DataContext);
	const durationInMinutes = transformDurationToMinutes(duration);

	const handlePlayTrack = () => {
		setTrack(props.data);
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
			<h3>{releaseDate}</h3>
			<h3>{durationInMinutes}</h3>
		</div>
	);
};

export default TrackElement;
