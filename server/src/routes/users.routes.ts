import { Router } from "express";
import { checkSchema } from "express-validator";

import { createUser } from "../controllers/users.controller";
import { createUserValidation } from "../helpers/user-validations";
import { validateFields } from "../middlewares/validate-fields";

const router = Router();

router.post("/user", checkSchema(createUserValidation), validateFields, createUser);

export default router;
