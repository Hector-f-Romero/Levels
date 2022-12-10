import { User, UserType } from "../entities/User";
const validateType = (value) => {
    if (!Object.values(UserType).includes(value)) {
        throw new Error("Type invalid.");
    }
    return true;
};
const userNameExist = async (userName) => {
    const userNameExist = await User.findOne({ where: { userName } });
    if (userNameExist) {
        throw new Error(`UserName ${userName} already exists in BD.`);
    }
    return true;
};
const emailExist = async (email) => {
    const emailExist = await User.findOne({ where: [{ email }] });
    if (emailExist) {
        throw new Error(`Email ${email} already exists in BD.`);
    }
    return true;
};
const createUserValidation = {
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
