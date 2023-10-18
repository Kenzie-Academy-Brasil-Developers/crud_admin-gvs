import format from "pg-format";
import { client } from "../database";
import {
  TCourse,
  TCourseCreate,
  TCourseRead,
  TCourseResult,
} from "../interfaces/course.interface";
import { TUserCourseResult } from "../interfaces/userCourse.interface";
import { courseReadSchema } from "../schemas/courses.schema";
import { userCourseResultSchema } from "../schemas/userCourses.schema";
//add token ?
export const createCourseService = async (
  data: TCourseCreate
): Promise<TCourse> => {
  const queryFormat: string = format(
    `INSERT INTO courses (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );
  const query: TCourseResult = await client.query(queryFormat);
  return query.rows[0];
};

export const getCourseService = async (): Promise<TCourseRead> => {
  const queryString : string = `SELECT * FROM courses;`
  const query: TCourseResult = await client.query(queryString)
  return query.rows
};

export const postCourseInUserService = async(courseId : string, userId : string): Promise<any> => {
  const queryFormat : string = format(`
  SELECT
    "uc"."userId",
    "u".name "userName",
    "uc"."courseId",
    "c".name "courseName",
    "c".description "courseDescription",
    "uc".active "userActiveInCourse"
  FROM 
    userCourses "uc"
  JOIN 
    users "u" ON "u".id = "uc"."userId"
  JOIN 
    courses "c" ON "c".id = "uc"."courseId"
  `)
  const query : TUserCourseResult = await client.query(queryFormat, [courseId, userId])
}
