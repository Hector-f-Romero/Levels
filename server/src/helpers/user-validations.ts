import { Schema } from "express-validator";
import { User, UserType } from "../entities/User";

const validateType = (value: string) => {
	if (!Object.values(UserType).includes(<UserType>value)) {
		throw new Error("Type invalid.");
	}
	return true;
};

const userNameExist = async (userName: string) => {
	const userNameExist = await User.find({ where: { userName } });

	if (!(userNameExist.length === 0)) {
		throw new Error("UserName already exists.");
	}
	return true;
};

const emailExist = async (email: string): Promise<boolean> => {
	const emailExist = await User.find({ where: [{ email }] });

	if (!(emailExist.length === 0)) {
		throw new Error("Email already exists.");
	}
	return true;
};

const createUserValidation: Schema = {
	names: {
		notEmpty: true,
		isString: true,
		errorMessage: "Names cannot be empty",
		isLength: {
			options: { max: 25 },
			errorMessage: "Names should be at most 25 chars long.",
		},
		trim: true,
	},
	lastNames: {
		notEmpty: true,
		isString: true,
		errorMessage: "Last names cannot be empty",
		isLength: {
			options: { max: 25 },
			errorMessage: "Last names should be at most 25 chars long.",
		},
		trim: true,
	},
	userName: {
		notEmpty: true,
		isString: true,
		errorMessage: "UserName cannot be empty",
		isLength: {
			options: { min: 3, max: 20 },
			errorMessage: "UserName should be at least 3 at most 20 chars long.",
		},
		custom: {
			options: (value) => userNameExist(value),
		},
		trim: true,
	},
	email: {
		notEmpty: true,
		isString: true,
		errorMessage: "Email cannot be empty",
		isEmail: {
			bail: true,
			errorMessage: "Email invalid.",
		},
		isLength: {
			options: { max: 50 },
			errorMessage: "Email should be at most 50 chars long.",
		},
		custom: {
			options: (value) => emailExist(value),
		},
		trim: true,
	},
	password: {
		notEmpty: true,
		isString: true,
		errorMessage: "Password cannot be empty",
		isLength: {
			options: { max: 15 },
			errorMessage: "Password should be at most 15 chars long.",
		},
		trim: true,
	},
	userType: {
		notEmpty: true,
		isString: true,
		errorMessage: "UserType cannot be empty.",
		custom: {
			options: (value) => validateType(value),
		},
		trim: true,
	},
};

export { createUserValidation };
