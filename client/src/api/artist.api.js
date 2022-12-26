import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/artists" });

const createArtistRequest = async (data) => {
	try {
		const res = await instance.post("/", data);
		return res.data;
	} catch (e) {
		return e.response;
	}
};

export { createArtistRequest };
