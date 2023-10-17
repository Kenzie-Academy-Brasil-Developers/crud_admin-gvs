import { Request, Response } from "express";
import { createCourseService } from "../services/courses.services";
import { TCourseCreate } from "../__tests__/mocks/interfaces";

export const createCourseController = async(req: Request, res: Response) : Promise<Response> => {
    const course = await createCourseService(req.body)
    return res.status(201).json(course)
}