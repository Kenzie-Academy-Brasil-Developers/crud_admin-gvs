import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";

export const verifyPermission = (req : Request, res : Response , next : NextFunction) => {
    const {userId} = req.params
    const {sub, admin} = res.locals
    if(admin){
        return next()
    }
    if(userId !== sub){
        throw new AppError("Insufficient permission", 403)
    }
    return next()
}