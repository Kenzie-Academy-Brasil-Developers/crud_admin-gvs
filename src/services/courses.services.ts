import format from "pg-format";
import { client } from "../database";
import { TCourse, TCourseCreate, TCourseResult } from "../interfaces/course.interface";
import { courseCreateSchema } from "../schemas/courses.schema";

export const courseCreateService = async (data:TCourseCreate): Promise<TCourse> => {
    const queryFormat : string = format(`INSERT INTO courses (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
    )
    const query : TCourseResult = await client.query(queryFormat)
    return query.rows[0]
};