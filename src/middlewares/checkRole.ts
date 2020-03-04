import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User as UserEntity } from "../entity/UserEntity";
import apiResponse from '../utilities/apiResponse';
import * as httpStatusCodes  from 'http-status-codes';

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    //Get user role from the database
    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      // res.status(401).send();
      apiResponse.error(res, httpStatusCodes.FORBIDDEN);
    }

    //Check if array of authorized roles includes the user's role
    if (roles.indexOf(user.role) > -1) next();
    else apiResponse.error(res, httpStatusCodes.FORBIDDEN);

  };
};
