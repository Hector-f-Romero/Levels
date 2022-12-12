import axios from "axios";

// axios({
// 	url: "http://localhost:4000",
// });

const createUserRequest = async (data) => {
	try {
		const res = await axios.post("/api/user", data);
		return res;
	} catch (error) {
		console.log(error);
	}
};

const loginUserRequest = async (data) => {
	try {
		const res = await axios.post("http://localhost:4000/api/auth/login", data);
		return res;
	} catch (e) {
		return e.response;
	}
};

export { createUserRequest, loginUserRequest };
