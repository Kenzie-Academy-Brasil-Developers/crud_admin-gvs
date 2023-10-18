import { Router } from "express";
import { validBody } from "../middlewares/validBody";
import { validToken } from "../middlewares/validToken.middleware";
import { courseCreateSchema } from "../schemas/courses.schema";
import { createCourseController, deleteCourseInUserController, getAllCourseController, postCourseInUserController } from "../controllers/course.controller";
import { verifyOwnerAndAdminPermission } from "../middlewares/verifyOwnerAndAdminPermission.middleware";
import { userCourseCreateSchema, userCourseResultSchema } from "../schemas/userCourses.schema";
import { validCourseExist } from "../middlewares/validCourseExist.middleware";
import { validEmailExist } from "../middlewares/validEmailExists.middleware";
export const courseRoutes : Router = Router()
courseRoutes.post('/', validToken, verifyOwnerAndAdminPermission ,validBody(courseCreateSchema), createCourseController)
courseRoutes.get('/', getAllCourseController)
courseRoutes.post('/:courseId/users/:userId',validCourseExist ,validToken, verifyOwnerAndAdminPermission ,validBody(userCourseCreateSchema), postCourseInUserController)
courseRoutes.delete('/:courseId/users/:userId', validToken ,verifyOwnerAndAdminPermission,validCourseExist, validEmailExist, deleteCourseInUserController)
courseRoutes.get('/:id/users' , validToken, verifyOwnerAndAdminPermission)