import { Request, Response } from "express";
import { TUserRead, TUserReturn } from "../interfaces/user.interface";
import { createUserService, getAllUsersService } from "../services/users.services";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: TUserReturn = await createUserService(req.body);
    return res.status(201).json(user);
  };

export const getAllUsersController = async (req: Request, res: Response): Promise<Response> =>{
  const user : TUserRead = await getAllUsersService()
  return res.status(200).json(user)
}