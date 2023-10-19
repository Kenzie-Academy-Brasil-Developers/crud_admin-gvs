import { NextFunction, query, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError.error";
import { TUserCourseResult } from "../interfaces/userCourse.interface";

export const validUserExist = async(req : Request, res: Response, next : NextFunction) : Promise<void> =>{
    const {userId, courseId} = req.params
    
    const queryString : TUserCourseResult = await client.query(`SELECT * FROM users WHERE "id" = $1;`,
    [userId])
    const queryStringCourse : TUserCourseResult = await client.query(`SELECT * FROM courses WHERE "id" = $1;`,
    [courseId]) 

    if(queryString.rowCount === 0 || queryStringCourse.rowCount === 0){
        throw new AppError("User/course not found" , 404)
    }

    res.locals = {...res.locals, foundUser: queryString.rows[0]}

    return next()
}

