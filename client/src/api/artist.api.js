import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/artists" });

const getArtistsRequest = async () => {
	try {
		const res = await instance.get("/");
		return res.data;
	} catch (e) {
		return e.response;
	}
};

const createArtistRequest = async (data) => {
	try {
		const res = await instance.post("/", data);
		return res.data;
	} catch (e) {
		return e.response;
	}
};

export { getArtistsRequest, createArtistRequest };
