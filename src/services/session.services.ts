import { sign } from "jsonwebtoken";
import { client } from "../database";
import AppError from "../errors/AppError.error";
import {
  TSessionCreate,
  TSessionReturn,
} from "../interfaces/session.interface";
import { TUser, TUserResult } from "../interfaces/user.interface";

export const loginService = async (
  data: TSessionCreate
): Promise<TSessionReturn> => {
  const query: TUserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1;',
    [data.email]
  );
  if (query.rowCount === 0) {
    throw new AppError("Wrong email/password", 401);
  }
  const user: TUser = query.rows[0];
  if (user.password !== data.password) {
    throw new AppError("Wrong email/password", 401);
  }
  const token: string = sign(
    { email: user.email, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  )
  return { token };
};
