import { Router } from "express";
import { checkSchema } from "express-validator";

import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users.controller";
import { createUserValidation } from "../helpers/user-validations";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", checkSchema(createUserValidation), validateFields, createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
