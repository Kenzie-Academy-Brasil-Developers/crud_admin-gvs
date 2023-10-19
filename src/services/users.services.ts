import { hash } from "bcryptjs";
import format from "pg-format";
import { client } from "../database";
import {
  TUserRead,
  TUserResult,
  TUserReturn,
} from "../interfaces/user.interface";
import { TUserCourseResult } from "../interfaces/userCourse.interface";
import { userReadSchema, userReturnSchema } from "../schemas/users.schema";
import { TUserCreate } from "../__tests__/mocks/interfaces";

export const createUserService = async (
  data: TUserCreate
): Promise<TUserReturn> => {
  data.password = await hash(data.password, 10);
  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(data),
    Object.values(data)
  );
  const query: TUserResult = await client.query(queryFormat);
  return userReturnSchema.parse(query.rows[0]);
};

export const getAllUsersService = async (): Promise<TUserRead> => {
  const queryString: string = `SELECT * FROM users;`;
  const query: TUserResult = await client.query(queryString);
  return userReadSchema.parse(query.rows);
};

export const getUserCourseService = async (userId: string): Promise<any> => {
  const queryFormat: string = format(`
  SELECT
    "c".id AS "courseId",
    "c".name AS "courseName",
    "c".description AS "courseDescription",
    "uc".active AS "userActiveInCourse",
    "u".id AS "userId",
    "u".name AS "userName"
FROM 
    users AS "u"
JOIN 
    "userCourses" AS "uc" ON "u".id = "uc"."userId"
JOIN 
    courses AS "c" ON "c".id = "uc"."courseId"
WHERE
    "u".id = $1;
  `);

  const query: TUserCourseResult = await client.query(queryFormat, [userId]);
  return query.rows;
};
