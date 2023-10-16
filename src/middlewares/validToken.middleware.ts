import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppError.error";

export const validToken = (req : Request, res : Response , next : NextFunction) : void => {
    const authorization : string | undefined = req.headers.authorization
    if(!authorization) throw new AppError("Wrong email/password", 401)
    const token : string = authorization.split("")[1]
    const decoded = verify(token, process.env.SECRET_KEY!)
    res.locals = {...res.locals, decoded}
    return next()
}