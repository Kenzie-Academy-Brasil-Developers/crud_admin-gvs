import { NextFunction, Request, Response } from "express"
import { client } from "../database"
import AppError from "../errors/AppError.error"
import { TUserCourseResult } from "../interfaces/userCourse.interface"

export const validCourseUser = async(req : Request, res: Response, next : NextFunction) : Promise<void> => {
    const {id} = req.params

    const queryString : TUserCourseResult = await client.query(`SELECT * FROM courses WHERE "id" = $1;`,
    [id]
    )

    if(queryString.rowCount === 0){
        throw new AppError("No course found" , 404)
    }

    const userHasCourses = await client.query(`SELECT * FROM "userCourses" WHERE "userId" = $1;`, [id]);

    if (userHasCourses.rowCount === 0) {
        throw new AppError("No course found" , 404);
    }

    res.locals = { ...res.locals, foundCourse: queryString.rows[0] };
    
    return next()
}