import axios from "axios";

const createTrackRequest = async (data) => {
	try {
		console.log(data);
		// const { trackData, featurings } = data;
		// console.log(trackData);
		const resTrackData = await axios.post("http://localhost:4000/api/tracks", data);
		return resTrackData;
	} catch (error) {
		console.log(error);
	}
};

export { createTrackRequest };
