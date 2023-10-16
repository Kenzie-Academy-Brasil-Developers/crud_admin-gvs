import { Router } from "express";
import { loginController } from "../controllers/session.controller";
import { validBody } from "../middlewares/validBody";
import { sessionSchema } from "../schemas/session.schema";
import { userRoutes } from "./user.routes";

export const sessionRoutes : Router = Router()
sessionRoutes.use('/login', validBody(sessionSchema),loginController )