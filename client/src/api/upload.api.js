import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/uploads", headers: localStorage.getItem("auth") });

const albumsEndpoint = "http://localhost:4000/api/albums";

const getArtistsRequest = async () => {
	try {
		const res = await instance.get("/");
		return res.data;
	} catch (e) {
		return e.response;
	}
};

const uploadFilerRequest = async (dataFile, entity, id) => {
	try {
		const res = await instance.post(`${albumsEndpoint}/${entity}/${id}`, dataFile);
		return res.data;
	} catch (e) {
		return e.response;
	}
};

export { uploadFilerRequest };
