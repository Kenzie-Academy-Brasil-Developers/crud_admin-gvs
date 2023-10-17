import { Router } from "express";
import { validBody } from "../middlewares/validBody";
import { validToken } from "../middlewares/validToken.middleware";
import { courseCreateSchema } from "../schemas/courses.schema";
import { createCourseController } from "../controllers/course.controller";
import { verifyOwnerAndAdminPermission } from "../middlewares/verifyOwnerAndAdminPermission.middleware";
export const courseRoutes : Router = Router()
courseRoutes.post('/', validToken, verifyOwnerAndAdminPermission ,validBody(courseCreateSchema), createCourseController)
courseRoutes.get('/')