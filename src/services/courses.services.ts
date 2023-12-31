import format from "pg-format";
import { client } from "../database";
import {
  TCourseCreate,
  TCourseRead,
  TCourseResult,
} from "../interfaces/course.interface";

export const createCourseService = async (
  data: TCourseCreate
): Promise<TCourseCreate> => {
  const queryFormat: string = format(
    `INSERT INTO courses (%I) VALUES (%L) RETURNING *;`,
    Object.keys(data),
    Object.values(data)
  );
  const query: TCourseResult = await client.query(queryFormat);
  return query.rows[0];
};

export const getCourseService = async (): Promise<TCourseRead> => {
  const queryString: string = `SELECT * FROM courses;`;
  const query: TCourseResult = await client.query(queryString);
  return query.rows;
};

export const postCourseInUserService = async (
  courseId: string,
  userId: string
): Promise<void> => {
  const queryFormat: string = format(`
  SELECT
    "u".id AS "userId",
    "u".name AS "userName",
    "c".id AS "courseId",
    "c".name AS "courseName",
    "c".description AS "courseDescription",
    "uc".active AS "userActiveInCourse"
  FROM 
    "userCourses" AS "uc"
  JOIN 
    users "u" ON "u".id = "uc"."userId"
  JOIN 
    courses "c" ON "c".id = "uc"."courseId"
  WHERE "c".id = $1 AND "u".id = $2

  `);
  const query: TCourseResult = await client.query(queryFormat, [
    courseId,
    userId,
  ]);
};

export const deleteCourseInUserService = async (
  courseId: string,
  userId: string
): Promise<void> => {
  const queryString = `
  UPDATE "userCourses"
  SET "active" = false
  WHERE "userCourses"."courseId" = $1 AND "userCourses"."userId" = $2;
`;
  await client.query(queryString, [courseId, userId]);
};

export const getAllUsersInCourseService = async (
  courseId: string
): Promise<TCourseRead> => {
  const queryFormat: string = format(`
    SELECT 
  "u".id AS "userId",
  "u".name AS "userName",
  "c".id AS "courseId",
  "c".name AS "courseName",
  "c".description AS "courseDescription",
  "uc".active AS "userActiveInCourse"
FROM 
  courses AS "c"
JOIN 
  "userCourses" AS "uc" ON "c".id = "uc"."courseId"
JOIN 
  users AS "u" ON "u".id = "uc"."userId"
WHERE  
  "c".id = $1;
  `);
  const query = await client.query(queryFormat, [courseId]);
  return query.rows;
};
