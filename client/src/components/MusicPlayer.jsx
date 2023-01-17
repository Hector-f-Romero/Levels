import React, { useState, useContext, useEffect, useRef } from "react";
import { FiPause, FiPlay } from "react-icons/fi";

import { DataContext } from "../context/dataContext";
import { transformDurationToMinutes } from "../helpers/normalize-data";

const MusicPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const { track, setTrack } = useContext(DataContext);

	const audioPlayer = useRef();
	const progressBar = useRef();
	const animationRef = useRef();

	useEffect(() => {
		console.log("Cambió el track");
		audioPlayer.current.play();
		setIsPlaying(true);
	}, [track]);

	useEffect(() => {
		const seconds = Math.floor(audioPlayer.current.duration);
		setDuration(seconds);
		progressBar.current.max = seconds;
	}, [audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState]);

	const changeRange = () => {
		audioPlayer.current.currentTime = progressBar.current.value;
		progressBar.current.style.setProperty(
			"--seek-before-width",
			`${(progressBar.current.value / duration) * 100}%`
		);
		setCurrentTime(progressBar.current.value);
	};

	const togglePlayPause = () => {
		const prevValue = isPlaying;
		setIsPlaying(!prevValue);
		if (!prevValue) {
			audioPlayer.current.play();
			animationRef.current = requestAnimationFrame(whilePlaying);
		} else {
			audioPlayer.current.pause();
			cancelAnimationFrame(animationRef);
		}
	};

	const whilePlaying = () => {
		progressBar.current.value = audioPlayer.current.currentTime;
		progressBar.current.style.setProperty(
			"--seek-before-width",
			`${(progressBar.current.value / duration) * 100}%`
		);
		setCurrentTime(progressBar.current.value);
		animationRef.current = requestAnimationFrame(whilePlaying);
	};

	return (
		<div className="music-player-container">
			<div className="music-player-track-info">
				<h5>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum repudiandae dolores, vitae
					consectetur
				</h5>
			</div>
			<div className="player-controller-container">
				<div className="player-controller">
					<div className="play-button" onClick={togglePlayPause}>
						{isPlaying ? <FiPause /> : <FiPlay />}
					</div>
					<audio ref={audioPlayer} src={track.pathTrack} preload="metadata"></audio>
				</div>
				<div className="progress-bar-container">
					<h3>{transformDurationToMinutes(currentTime)}</h3>
					<input
						type="range"
						className="progress-bar"
						defaultValue="0"
						ref={progressBar}
						onChange={changeRange}
					/>
					<h3>{duration && !isNaN(duration) && transformDurationToMinutes(duration)}</h3>
				</div>
			</div>
		</div>
	);
};

export default MusicPlayer;
