import { Router } from "express";
import { createUserController, getAllUsersController, getUserCourseController } from "../controllers/users.controller";
import { validBody } from "../middlewares/validBody";
import { validCourseUser } from "../middlewares/validCourseUser.middleware";
import { validToken } from "../middlewares/validToken.middleware";
import { verifyOwnerAndAdminPermission} from "../middlewares/verifyOwnerAndAdminPermission.middleware";
import { userCreateSchema } from "../schemas/users.schema";
import { validEmailExist } from "../middlewares/validEmailExists.middleware";

export const userRoutes : Router = Router()
userRoutes.post('/', validBody(userCreateSchema), validEmailExist ,createUserController)
userRoutes.get('/', validToken, verifyOwnerAndAdminPermission ,getAllUsersController)
userRoutes.get('/:id/courses',validToken, verifyOwnerAndAdminPermission, validCourseUser ,getUserCourseController )