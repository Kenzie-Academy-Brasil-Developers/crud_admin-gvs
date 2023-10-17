import { Router } from "express";
import { validBody } from "../middlewares/validBody";
import { courseCreateSchema } from "../schemas/courses.schema";
export const courseRoutes : Router = Router()
courseRoutes.post('/', validBody(courseCreateSchema))