import axios from "axios";

const createTrackRequest = async (data) => {
	try {
		console.log(data);
		const { trackData, featurings, pathTrack } = data;

		const resTrackData = await axios.post("http://localhost:4000/api/tracks", {
			trackData,
			featurings,
		});
		const formData = new FormData();
		formData.append("pathTrack", pathTrack[0]);
		const resUploadTrack = await axios.post(
			`http://localhost:4000/api/uploads/tracks/${resTrackData.data.idTrack}`,
			formData
		);
		return { resTrackData: resTrackData.data, resUploadTrack: resUploadTrack.data };
	} catch (error) {
		console.log(error);
	}
};

export { createTrackRequest };
