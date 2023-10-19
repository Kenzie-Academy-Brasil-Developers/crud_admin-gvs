import { Router } from "express";
import { validBody } from "../middlewares/validBody";
import { validToken } from "../middlewares/validToken.middleware";
import { courseCreateSchema } from "../schemas/courses.schema";
import { createCourseController, deleteCourseInUserController, getAllCourseController, getAllUsersInCourseController, postCourseInUserController } from "../controllers/course.controller";
import { verifyOwnerAndAdminPermission } from "../middlewares/verifyOwnerAndAdminPermission.middleware";
import { userCourseCreateSchema, userCourseResultSchema } from "../schemas/userCourses.schema";
import { validCourseExist } from "../middlewares/validCourseExist.middleware";
import { validEmailExist } from "../middlewares/validEmailExists.middleware";
import { validUserExist } from "../middlewares/validUserExist.middleware";
export const courseRoutes : Router = Router()
courseRoutes.post('/', validToken, verifyOwnerAndAdminPermission ,validBody(courseCreateSchema), createCourseController)
courseRoutes.get('/', getAllCourseController)
courseRoutes.post('/:courseId/users/:userId',validToken ,verifyOwnerAndAdminPermission, validUserExist ,validBody(userCourseCreateSchema), postCourseInUserController)
courseRoutes.delete('/:courseId/users/:userId', validToken ,verifyOwnerAndAdminPermission,validUserExist, deleteCourseInUserController)
courseRoutes.get('/:id/users' , validToken, verifyOwnerAndAdminPermission , getAllUsersInCourseController)