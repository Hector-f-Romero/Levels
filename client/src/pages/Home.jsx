import React, { useState } from "react";
import TrackCard from "../components/TrackCard";
import "../css/styles.css";

const Home = () => {
	return (
		<div>
			<h2>Page home</h2>
			<div className="allTracks">
				<TrackCard />
				<TrackCard />
			</div>
		</div>
	);
};
export default Home;
