import { Router } from "express";
import { validBody } from "../middlewares/validBody";
import { validToken } from "../middlewares/validToken.middleware";
import { courseCreateSchema } from "../schemas/courses.schema";
import { createCourseController, getAllCourseController, postCourseInUserController } from "../controllers/course.controller";
import { verifyOwnerAndAdminPermission } from "../middlewares/verifyOwnerAndAdminPermission.middleware";
import { userCourseResultSchema } from "../schemas/userCourses.schema";
export const courseRoutes : Router = Router()
courseRoutes.post('/', validToken, verifyOwnerAndAdminPermission ,validBody(courseCreateSchema), createCourseController)
courseRoutes.get('/', getAllCourseController)
courseRoutes.post('/courses/:courseId/users/:userId', validToken, verifyOwnerAndAdminPermission, validBody(userCourseResultSchema), postCourseInUserController)