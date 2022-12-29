import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/albums" });

const getAlbumsWithArtistRequest = async () => {
	try {
		const res = await instance.get("/info/artists");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

const getAlbumsRequest = async () => {
	try {
		const res = await instance.get("/");
		return res.data;
	} catch (e) {
		return e.response;
	}
};

const createAlbumRequest = async (data) => {
	try {
		const res = await instance.post("/", data);
		return res.data;
	} catch (e) {
		return e.response;
	}
};
export { getAlbumsRequest, getAlbumsWithArtistRequest, createAlbumRequest };
