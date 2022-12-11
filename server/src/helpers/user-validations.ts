import { Schema } from "express-validator";
import { User, UserType } from "../entities/User";

const validateType = (value: string) => {
	if (!Object.values(UserType).includes(<UserType>value)) {
		throw new Error("Type invalid.");
	}
	return true;
};

const userNameExist = async (userName: string): Promise<void> => {
	const userNameExist = await User.findOne({ where: { userName } });
	if (userNameExist) {
		throw new Error(`UserName ${userName} already exists in BD.`);
	}
};

const emailExist = async (email: string): Promise<void> => {
	const emailExist = await User.findOne({ where: [{ email }] });
	if (emailExist) {
		throw new Error(`Email ${email} already exists in BD.`);
	}
};

const createUserValidation: Schema = {
	names: {
		notEmpty: true,
		isString: true,
		trim: true,
		errorMessage: "Names cannot be empty",
		isLength: {
			options: { max: 25 },
			errorMessage: "Names should be at most 25 chars long.",
		},
	},
	lastNames: {
		notEmpty: true,
		isString: true,
		trim: true,
		errorMessage: "Names cannot be empty",
		isLength: {
			options: { max: 25 },
			errorMessage: "Last names should be at most 25 chars long.",
			bail: true,
		},
	},
	userName: {
		notEmpty: true,
		isString: true,
		trim: true,
		errorMessage: "UserName cannot be empty",
		isLength: {
			options: { min: 3, max: 20 },
			errorMessage: "UserName should be at least 3 at most 20 chars long.",
			bail: true,
		},
		custom: {
			options: (value) => userNameExist(value),
			bail: true,
		},
	},
	email: {
		notEmpty: true,
		isString: true,
		trim: true,
		errorMessage: "Email cannot be empty",
		isEmail: {
			errorMessage: "Email invalid.",
			bail: true,
		},
		isLength: {
			options: { max: 50 },
			errorMessage: "Email should be at most 50 chars long.",
			bail: true,
		},
		custom: { options: (value) => emailExist(value), bail: true },
	},
	password: {
		notEmpty: true,
		isString: true,
		trim: true,
		errorMessage: "Password cannot be empty",
		isLength: {
			options: { max: 15 },
			errorMessage: "Password should be at most 15 chars long.",
		},
	},
	userType: {
		notEmpty: true,
		isString: true,
		trim: true,
		errorMessage: "UserType cannot be empty.",
		custom: {
			options: (value) => validateType(value),
			errorMessage: "Type invalid.",
		},
	},
};

export { createUserValidation, userNameExist, emailExist };
