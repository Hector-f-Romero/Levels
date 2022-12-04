import { Request, Response } from "express";
import { User } from "../entities/User";

const createUser = async (req: Request, res: Response) => {
	try {
		const { names, lastNames, userName, email, password, userType } = req.body;
		console.log(req.body);

		const user = new User();
		user.names = names;
		user.lastNames = lastNames;
		user.userName = userName;
		user.email = email;
		user.password = password;
		user.userType = userType;

		user.save();

		res.status(200).json({ msg: "Creación de usuario exitosa.", nombre: names });
	} catch (error) {
		console.log(error);
	}
};

export { createUser };
