import { z } from "zod";
import { courseCreateSchema, courseReadSchema, courseSchema } from "../schemas/courses.schema";

export type TCourse = z.infer<typeof courseSchema>
export type TCourseCreate = z.infer<typeof courseCreateSchema>
export type TCourseRead = z.infer<typeof courseReadSchema>