import { sign, verify } from "jsonwebtoken";
import "dotenv/config";

const generateJWT = (idUser: string) => {
	return new Promise((resolve, reject) => {
		const payload = { idUser };
		sign(payload, process.env.SECRET_JWT || "", { expiresIn: "2d" }, (err, token) => {
			if (err) {
				console.log(err);
				reject("Error creating JWT.");
			} else {
				resolve(token);
			}
		});
	});
};

const verifyJWTLogic = (jwt: string) => {
	const resultVerification = verify(jwt, process.env.SECRET_JWT || "");
	return resultVerification;
};

export { generateJWT, verifyJWTLogic };
