import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { client } from "../database";
import { TUserResult } from "../interfaces/user.interface";

export const validEmailExist = async ( req : Request, res : Response, next : NextFunction) : Promise<void> => {
    const {email} = req.body
    
    const user : TUserResult = await client.query(
        'SELECT * FROM "users" WHERE "email" = $1;',
        [email]
      )
      
    if(user.rows[0]){
        throw new AppError("Email already registered", 409)
    }
    return next()

}