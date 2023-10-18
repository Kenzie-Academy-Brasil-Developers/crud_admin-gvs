import { NextFunction, Request, Response } from "express"
import { client } from "../database"
import AppError from "../errors/AppError.error"
import { TUserCourseResult } from "../interfaces/userCourse.interface"

export const validCourseUser = async(req : Request, res: Response, next : NextFunction) : Promise<void> => {
    const {courseId} = req.params

    const queryString : TUserCourseResult = await client.query(`SELECT * FROM courses WHERE "id" = $1;`,
    [courseId]
    )

    if(queryString.rowCount === 0){
        throw new AppError("No course found" , 404)
    }

    res.locals = {...res.locals, }

}