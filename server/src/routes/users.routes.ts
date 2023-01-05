import { Router } from "express";
import { check, checkSchema } from "express-validator";

import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users.controller";
import { createUserValidation, userIdExist } from "../helpers/user-validations";
import { validateFields } from "../middlewares/validate-fields";
import { verifyJWT } from "../middlewares/verify-jwt";

const router = Router();

router.get("/", getUsers);
router.get("/:id", [check("id").not().isEmpty().custom(userIdExist), validateFields], getUser);
router.post("/", checkSchema(createUserValidation), validateFields, createUser);
router.patch("/:id", [verifyJWT, check("id").not().isEmpty().custom(userIdExist), validateFields], updateUser);
router.delete("/:id", [verifyJWT, check("id").not().isEmpty().custom(userIdExist), validateFields], deleteUser);

export default router;
