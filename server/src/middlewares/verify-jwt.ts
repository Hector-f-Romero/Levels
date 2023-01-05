import { NextFunction, Request, Response } from "express";
import { handleHttp } from "../helpers/error.handle";
import { verifyJWTLogic } from "../helpers/jwt.hanlde";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const jwtByUser = req.headers.authorization || "";
		const jwt = jwtByUser.split(" ").pop();
		const resultValidation = verifyJWTLogic(`${jwt}`);
		console.log(resultValidation);
		next();
	} catch (error) {
		handleHttp(res, error, "ERROR_VERIFY_TOKEN");
	}
};

export { verifyJWT };
