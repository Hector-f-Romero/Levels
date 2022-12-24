import React, { useState } from "react";
import Modal from "../components/Modal";
import TrackCard from "../components/TrackCard";
import "../css/styles.css";

const Home = () => {
	const [activeModal, setActiveModal] = useState(false);

	const toggle = () => {
		setActiveModal(!activeModal);
	};
	return (
		<div>
			<h2>Page home</h2>
			<div className="allTracks">
				<TrackCard />
				<TrackCard />
			</div>
			<Modal active={activeModal} toggle={toggle}>
				<h2>Hola</h2>
			</Modal>
			<button onClick={toggle}>Open </button>
		</div>
	);
};
export default Home;
