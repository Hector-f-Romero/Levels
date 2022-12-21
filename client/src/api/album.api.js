import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4000/api/albums" });

const getAlbumsRequest = async (req, res) => {
	try {
		const res = await instance.get("/info/artists");
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export { getAlbumsRequest };
