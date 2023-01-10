import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/artists" });

const uploadArtistPhotoEndpoint = "http://localhost:4000/api/uploads/artists";

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
		console.log(data);

		const { artistPhoto, ...dataArtist } = data;
		const resArtist = await instance.post("/", dataArtist);

		const { idArtist } = resArtist.data;
		const formData = new FormData();
		formData.append("artistPhoto", data.artistPhoto[0]);
		const resUploadArtist = await axios.post(`${uploadArtistPhotoEndpoint}/${idArtist}`, formData);
		// {
		// 	headers: { "Content-Type": "multipart/form-data" },
		// });
		const allResponses = { resArtist: resArtist.data, resUploadArtist: resUploadArtist.data };
		return allResponses;
	} catch (e) {
		return e.response;
	}
};

export { getArtistsRequest, createArtistRequest };
