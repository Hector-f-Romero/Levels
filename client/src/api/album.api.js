import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/albums", headers: localStorage.getItem("auth") });

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
		const res = await instance.post("/", dataAlbum);
		const formData = new FormData();
		formData.append("coverAlbum", data.coverAlbum[0]);
		console.log(res.data);
		console.log(coverAlbum[0]);
		console.log(formData);
		const { idAlbum } = res.data;
		const resUploadAlbum = await axios.post(`${uploadEndpoint}/albums/${idAlbum}`, formData);
		// {
		// 	headers: { "Content-Type": "multipart/form-data" },
		// });
		console.log(resUploadAlbum);
		return res.data;
	} catch (e) {
		return e.response;
	}
};
export { getAlbumsRequest, getAlbumsWithArtistRequest, createAlbumRequest };
