import { z } from "zod"
export const userCourseSchema = z.object({
    id : z.number().positive(),
    active : z.boolean().default(true),
    userId: z.number().positive(),
    courseId: z.number().positive()
})
export const userCourseResultSchema = userCourseSchema.omit({id: true, active: true, userId: true, courseId:true})
export const userCourseCreateSchema = userCourseSchema.omit({id: true , userId : true, courseId : true})
export const userCourseReadSchema = userCourseSchema.array()