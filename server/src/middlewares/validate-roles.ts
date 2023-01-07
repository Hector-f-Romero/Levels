import { NextFunction, Request, Response } from "express";
import { UserType } from "../entities/User";

const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
	const { idUser, userType } = res.locals.userData;

	if (!userType) {
		return res.status(400).json({ msg: "User data not found." });
	}

	if (!(UserType.ADMIN === userType)) {
		return res.status(403).json({ msg: `The user ${idUser} doesn't have ADMIN role.` });
	}

	next();
};

export { isAdminRole };
