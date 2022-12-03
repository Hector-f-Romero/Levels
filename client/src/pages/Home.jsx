import React from "react";
import TrackCard from "../components/TrackCard";
import "../css/styles.css";

const Home = () => {
	return (
		<div>
			<h1>Hola</h1>
			<div className="allTracks">
				<TrackCard />
				<TrackCard />
			</div>
		</div>
	);
};

export default Home;
