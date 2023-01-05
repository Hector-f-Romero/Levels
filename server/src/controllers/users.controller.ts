import { Request, Response } from "express";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

import { User } from "../entities/User";
import { handleHttp } from "../helpers/error.handle";
import { AppDataSource } from "../config/mysql";

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await userRepository.find();
		res.status(200).json(users);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_USERS (GET)");
	}
};

const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const users = await userRepository.findOneBy({ idUser: req.params.id });
		res.status(200).json(users);
	} catch (error) {
		handleHttp(res, error, "ERROR_GET_USERS (GET_BY_ID)");
	}
};

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { names, lastNames, userName, email, password, userType } = req.body;
		const salt = await bcrypt.genSalt();

		const user = userRepository.create({
			idUser: nanoid(),
			names: names,
			lastNames: lastNames,
			userName: userName,
			email: email,
			password: await bcrypt.hash(password, salt),
			userType: userType,
		});

		await userRepository.save(user);
		res.status(201).json(user);
	} catch (error) {
		handleHttp(res, error, "ERROR_CREATE_USER (POST)");
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const { names, lastNames, userName, email, password, userType } = req.body;
		const updatedUser = await AppDataSource.createQueryBuilder()
			.update(User)
			.set({ names, lastNames, userName, email, password, userType })
			.where({ idUser: req.params.id })
			.execute();
		res.status(204).json(updatedUser);
	} catch (error) {
		handleHttp(res, error, "ERROR_UPDATE_USER (PATCH)");
	}
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		await AppDataSource.createQueryBuilder().delete().from(User).where({ idUser: req.params.id }).execute();
		res.status(201).json({ msg: `User with id ${req.params.id} deleted correctly.` });
	} catch (error) {
		handleHttp(res, error, "ERROR_DELETE_USER (DELETE)");
	}
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
