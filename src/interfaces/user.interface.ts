
import { QueryResult } from "pg"
import {z} from "zod"
import { userCreateSchema, userSchema, userUpdateSchema } from "../schemas/users.schema"

export type TUser = z.infer<typeof userSchema>
export type TUserCreate = z.infer<typeof userCreateSchema>
export type TUserRead = Array<TUser>
export type TUserUpdate = z.infer<typeof userUpdateSchema>
export type TUserResult = QueryResult<TUser>
