import axios from "axios";

const createFeaturings = async (data) => {
	try {
		const res = await axios.post("http://localhost:4000/api/relationships/track/featurings", data);
		return res;
	} catch (e) {
		return e.response;
	}
};

export { createFeaturings };
