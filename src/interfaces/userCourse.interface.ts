import { QueryResult } from "pg";
import { z } from "zod";
import { userCourseCreateSchema, userCourseReadSchema, userCourseResultSchema, userCourseSchema } from "../schemas/userCourses.schema";

export type TUserCourse = z.infer<typeof userCourseSchema>
export type TUserCourseResult = QueryResult<typeof userCourseResultSchema>
export type TUserCourseCreate = z.infer<typeof userCourseCreateSchema>
export type TUserCourseRead = z.infer<typeof userCourseReadSchema>