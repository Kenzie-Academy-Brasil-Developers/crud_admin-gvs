import { Request, Response } from "express";
import { createCourseService ,deleteCourseInUserService, postCourseInUserService } from "../services/courses.services";
import { getAllUsersService } from "../services/users.services";
import { getAllUsersInCourseService } from "../services/courses.services";

export const createCourseController = async(req: Request, res: Response) : Promise<Response> => {
    const course = await createCourseService(req.body)
    return res.status(201).json(course)
}
export const getAllCourseController = async(req: Request, res: Response) : Promise<Response> => {
    const course = await getAllUsersService()
    return res.status(200).json(course)
}
export const postCourseInUserController = async(req: Request, res: Response) : Promise<Response> => {
    const userCourse = await postCourseInUserService( req.params.courseId, req.params.userId)
    return res.status(201).json({ message: "User successfully vinculed to course"})
}

export const deleteCourseInUserController = async(req: Request, res: Response) :Promise<Response> => {
    const userCourse = await deleteCourseInUserService(req.params.courseId, req.params.userId)
    return res.status(204).json()
}
export const getAllUsersInCourseController = async(req: Request, res: Response) :Promise<Response> => {
    const userCourse = await getAllUsersInCourseService(req.params.id)
    return res.status(200).json(userCourse)
}