import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";

export const verifyOwnerAndAdminPermission = (req : Request, res : Response , next : NextFunction) => {
    let {id} = req.params
    const {sub, admin} = res.locals.decoded
    if(!id){
        id = req.params.userId
    }
    if(admin){
        return next()
    }
    if(id !== sub){
        throw new AppError("Insufficient permission", 403)
    }
    if(!admin){
        throw new AppError("Insufficient permission", 403)
    }
    return next()
}