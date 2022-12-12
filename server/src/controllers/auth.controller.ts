import { Request, Response } from "express";
import { User } from "../entities/User";

import { handleHttp } from "../helpers/error.handle";

const login = async (req: Request, res: Response) => {
	try {
		const { userName, password } = req.body;
		console.log(userName);
		const user = await User.findOne({ where: [{ userName }] });

		if (!user) {
			return res.status(404).json({ msg: "UserName doesn't exist." });
		}
		return res.status(200).json({ msg: "todo ok" });
	} catch (error) {
		handleHttp(res, error, "ERROR_LOGIN_USER");
	}
};

export { login };
