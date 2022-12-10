import { Request, Response } from "express";
import { nanoid } from "nanoid";

import { User } from "../entities/User";
import { handleHttp } from "../helpers/error.handle";

const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		handleHttp(res, "ERROR_GET_USERS (GET)");
	}
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const user = await User.findOne({
			where: [
				{
					idUser: req.params.id,
				},
			],
		});
		console.log(user);
		res.status(200).json({ user });
	} catch (error) {
		res.status(500).json(error);
	}
};

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { names, lastNames, userName, email, password, userType } = req.body;

		const user = new User();
		user.idUser = nanoid();
		user.names = names;
		user.lastNames = lastNames;
		user.userName = userName;
		user.email = email;
		user.password = password;
		user.userType = userType;

		user.save();

		res.status(200).json({ msg: "Creación de usuario exitosa.", nombre: names });
	} catch (error) {
		handleHttp(res, "ERROR_CREATE_USER (POST)");
	}
};

export { getUsers, getUserById, createUser };
