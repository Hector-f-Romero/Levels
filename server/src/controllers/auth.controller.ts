import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../entities/User";
import { handleHttp } from "../helpers/error.handle";
import { generateJWT } from "../helpers/jwt.hanlde";

const login = async (req: Request, res: Response) => {
	try {
		const { userName, password } = req.body;
		console.log(userName);
		const user = await User.findOneBy({ userName });

		if (!user) {
			return res.status(404).json({ msg: "UserName doesn't exist." });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ msg: "Incorrect password." });
		}

		const jwt = await generateJWT(user.idUser);

		return res.status(200).json({ user, jwt });
	} catch (error) {
		handleHttp(res, error, "ERROR_LOGIN_USER");
	}
};

export { login };
