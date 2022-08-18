import router from "express";
import { createUser, showUserBalance } from "../controllers/user.controller.js";
import { userValidationSchema } from "../schema/user.validation.schema.js";
import { validateRequestSchema } from "../middleware/validate.request.schema.js";

export const userRouter = router();

userRouter.post("/create-user", createUser);

userRouter.get("/show", userValidationSchema, validateRequestSchema, showUserBalance);
