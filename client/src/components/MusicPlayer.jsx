import React, { useState, useContext, useEffect } from "react";
import { FiPlay } from "react-icons/fi";

import { DataContext } from "../context/dataContext";

const MusicPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const { track, setTrack } = useContext(DataContext);

	useEffect(() => {
		console.log("Cambió el track");
	}, [track]);

	return (
		<div className="music-player-container">
			<div className="play-button">
				<FiPlay />
			</div>
			<audio src={track.pathTrack} preload="metadata"></audio>
		</div>
	);
};

export default MusicPlayer;
