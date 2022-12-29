import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/genres" });

const getGenresRequest = async () => {
	try {
		const res = await instance.get("/");
		return res.data;
	} catch (e) {
		return e.response;
	}
};

const createGenreRequest = async (data) => {
	try {
		const res = await instance.post("/", data);
		return res.data;
	} catch (e) {
		return e.response;
	}
};

export { getGenresRequest, createGenreRequest };
