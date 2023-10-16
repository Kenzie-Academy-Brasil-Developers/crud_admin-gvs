import { Router } from "express";
import { createUserController, getAllUsersController } from "../controllers/users.controller";
import { validBody } from "../middlewares/validBody";
import { validToken } from "../middlewares/validToken.middleware";
import { verifyPermission } from "../middlewares/verifyPermission.middleware";
import { userCreateSchema } from "../schemas/users.schema";

export const userRoutes : Router = Router()
userRoutes.post('/',validBody(userCreateSchema), createUserController)
userRoutes.get('/', validToken, verifyPermission ,getAllUsersController)