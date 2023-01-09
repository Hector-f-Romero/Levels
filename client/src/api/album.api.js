import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/albums" });

const uploadEndpoint = "http://localhost:4000/api/uploads";

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
		const { coverAlbum, ...dataAlbum } = data;
		const resAlbum = await instance.post("/", dataAlbum);

		// if (coverAlbum.length === 0) {
		// 	return resAlbum.data;
		// }

		const { idAlbum } = resAlbum.data;
		console.log(idAlbum);
		const formData = new FormData();
		formData.append("coverAlbum", data.coverAlbum[0]);
		const resUploadAlbum = await axios.post(`${uploadEndpoint}/albums/${idAlbum}`, formData);
		// {
		// 	headers: { "Content-Type": "multipart/form-data" },
		// });
		const allResponses = { resAlbum: resAlbum.data, resUploadAlbum: resUploadAlbum.data };
		return allResponses;
	} catch (e) {
		return e.response;
	}
};
export { getAlbumsRequest, getAlbumsWithArtistRequest, createAlbumRequest };
