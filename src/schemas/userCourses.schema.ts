import { z } from "zod"
export const userCourseSchema = z.object({
    id : z.number().positive(),
    active : z.boolean(),
    userId: z.number().positive(),
    courseId: z.number().positive()
})
export const userCourseResultSchema = userCourseSchema.omit({id: true})
