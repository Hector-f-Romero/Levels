import axios from "axios";

const createTrackRequest = async (data) => {
	try {
		const res = await axios.post("http://localhost:4000/api/tracks", data);
		return res;
	} catch (error) {
		console.log(error);
	}
};

export { createTrackRequest };
