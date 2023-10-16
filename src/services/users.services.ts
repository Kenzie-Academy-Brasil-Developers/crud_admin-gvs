import { hash } from "bcryptjs";
import format from "pg-format";
import { client } from "../database";
import { TUserResult } from "../interfaces/user.interface";
import { userReturnSchema } from "../schemas/users.schema";
import { TUserCreate } from "../__tests__/mocks/interfaces";

export const createUserService = async(data: TUserCreate) : Promise<TUserResult>=> {
    data.password = await hash(data.password, 10)
    const queryFormat: string = format(
        'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(data),
        Object.values(data)
      );
    const query: TUserResult = await client.query(queryFormat);
    return userReturnSchema.parse(query.rows[0])
}