import { Router } from "express";
import { createUserController } from "../controllers/users.controller";
import { validBody } from "../middlewares/validBody";
import { userCreateSchema } from "../schemas/users.schema";

export const userRoutes : Router = Router()
userRoutes.post('/',validBody(userCreateSchema), createUserController)