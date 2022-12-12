import { Request, Response } from "express";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

import { User } from "../entities/User";
import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";

const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_USERS (GET)");
	}
};

const getUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({
			where: [
				{
					idUser: req.params.id,
				},
			],
		});

		if (!user) {
			return res.status(404).json({ msg: `Don't exist users in BD with the id ${req.params.id}` });
		}

		return res.status(200).json({ user });
	} catch (error) {
		return res.status(500).json(error);
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		const { names, lastNames, userName, email, password, userType } = req.body;
		const salt = await bcrypt.genSalt();

		const user = new User();
		user.idUser = nanoid();
		user.names = names;
		user.lastNames = lastNames;
		user.userName = userName;
		user.email = email;
		user.password = await bcrypt.hash(password, salt);
		user.userType = userType;
		user.save();

		return res.status(201).json({ msg: "Creación de usuario exitosa.", nombre: names });
	} catch (error) {
		console.log("CATCH DE CREATE USER");
		handleHttp(res, error, "ERROR_CREATE_USER (POST)");
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const { names, lastNames, userName, email, password, userType } = req.body;
		await AppDataSource.createQueryBuilder()
			.update(User)
			.set({ names, lastNames, userName, email, password, userType })
			.where({ idUser: id })
			.execute();
		res.status(200).json({ msg: "User update correctly." });
	} catch (error) {
		handleHttp(res, error, "ERROR_UPDATE_USER (PATCH)");
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await AppDataSource.createQueryBuilder().delete().from(User).where({ idUser: id }).execute();

		return res.status(201).json({ msg: `User with id ${id} deleted correctly.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_DELETE_USER (DELETE)");
	}
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
