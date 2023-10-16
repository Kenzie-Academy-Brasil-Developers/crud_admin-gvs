import { Request, Response } from "express";
import { TUserReturn } from "../interfaces/user.interface";
import { createUserService } from "../services/users.services";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const user: TUserReturn = await createUserService(req.body);
    return res.status(201).json(user);
  };