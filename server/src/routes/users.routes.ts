import { Router } from "express";
import { checkSchema } from "express-validator";

import { createUser, getUserById, getUsers } from "../controllers/users.controller";
import { createUserValidation } from "../helpers/user-validations";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", checkSchema(createUserValidation), validateFields, createUser);

export default router;
