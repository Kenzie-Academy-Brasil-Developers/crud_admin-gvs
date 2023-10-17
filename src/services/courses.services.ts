import format from "pg-format";
import { client } from "../database";
import {
  TCourse,
  TCourseCreate,
  TCourseRead,
  TCourseResult,
} from "../interfaces/course.interface";
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
export const getCourseService = async (
  admin: boolean
): Promise<TCourseRead> => {
  if (!admin) {
    const queryString: string = `SELECT * FROM courses;`;
  }
};
