import { Router } from "express";
import { loginController } from "../controllers/session.controller";
import { validBody } from "../middlewares/validBody";
import { sessionSchema } from "../schemas/session.schema";
import { validEmailExist } from "../middlewares/validEmailExists.middleware";

export const sessionRoutes : Router = Router()
sessionRoutes.post('/',validBody(sessionSchema),loginController )