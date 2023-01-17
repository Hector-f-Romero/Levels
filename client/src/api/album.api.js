import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/albums" });

const uploadAlbumCoverEndpoint = "http://localhost:4000/api/uploads/albums";

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

const getAlbumWithTrackRequest = async (id) => {
	try {
		const res = await axios.get(`http://localhost:4000/api/relationships/albums/info/${id}`);
		return res.data[0];
	} catch (e) {
		return e.response;
	}
};

const createAlbumRequest = async (data) => {
	try {
		console.log(data);
		const { albumCover, ownedBy, ...dataAlbum } = data;
		const resAlbum = await instance.post("/", dataAlbum);
		console.log(albumCover);
		const { idAlbum } = resAlbum.data;
		const formData = new FormData();
		formData.append("albumCover", data.albumCover[0]);
		const resUploadAlbum = await axios.post(`${uploadAlbumCoverEndpoint}/${idAlbum}`, formData);
		// {
		// 	headers: { "Content-Type": "multipart/form-data" },
		// });

		const resLinkArtistToAlbum = await axios.post("http://localhost:4000/api/relationships/link/album/artists", {
			idArtist: ownedBy,
			idAlbum,
		});

		const allResponses = {
			resAlbum: resAlbum.data,
			resUploadAlbum: resUploadAlbum.data,
			resLink: resLinkArtistToAlbum.data,
		};
		return allResponses;
	} catch (e) {
		return e.response;
	}
};
export { getAlbumsRequest, getAlbumWithTrackRequest, getAlbumsWithArtistRequest, createAlbumRequest };
