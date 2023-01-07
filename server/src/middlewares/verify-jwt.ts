import { NextFunction, Request, Response } from "express";

import { AppDataSource } from "../config/mysql";
import { User } from "../entities";
import { handleHttp } from "../helpers/error.handle";
import { verifyJWTLogic } from "../helpers/jwt.hanlde";

const userRepository = AppDataSource.getRepository(User);

/**
 * Verify if the JWT is an object, the key "idUser" exists in this object and if the idUser exists in BD.
 * @param req
 * @param res
 * @param next
 */
const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const jwtByUser = req.headers.authorization || "";
		const jwt = jwtByUser.split(" ").pop();
		const resultValidation = verifyJWTLogic(`${jwt}`);

		if (!(resultValidation instanceof Object)) {
			throw new Error("Error occurred in validation of jwt (Not an object");
		}

		if (!resultValidation.idUser) {
			throw new Error("idUser doesn't exists in the JWT.");
		}

		const existsUser = await userRepository.findOneBy({ idUser: resultValidation.idUser });
		if (!existsUser) {
			throw new Error(`The user with id ${resultValidation.idUser} doesn't exist.`);
		}
		res.locals.userData = existsUser;
		next();
	} catch (error) {
		handleHttp(res, error, "ERROR_VERIFY_TOKEN");
	}
};

export { verifyJWT };
