
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as httpStatusCodes from 'http-status-codes';
import apiResponse from '../utilities/apiResponse';
import { User as UserEntity } from "../entity/UserEntity";

class UserController {

  static listAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(UserEntity);
    const users = await userRepository.find({
      select: ["id", "username", "role"]
    });

    apiResponse.success(res, users, httpStatusCodes.OK);
  };

  static getOneById = async (req: Request, res: Response) => {
    const id: number = req.params.id;
    const userRepository = getRepository(UserEntity);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "username", "role"]
      });
      apiResponse.success(res, user, httpStatusCodes.OK);
    } catch (error) {
      apiResponse.error(res, httpStatusCodes.NOT_FOUND, error);
    }
  };

  static newUser = async (req: Request, res: Response) => {
    let { username, password, role } = req.body;
    let user = new UserEntity();
    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user);
    if (errors.length > 0) {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST, errors);
      return;
    }

    user.hashPassword();

    const userRepository = getRepository(UserEntity);
    try {
      await userRepository.save(user);
    } catch (errors) {
      apiResponse.error(res, httpStatusCodes.CONFLICT, 'user already in db');
      return;
    }

    apiResponse.success(res, { res: 'User created' }, httpStatusCodes.CREATED);
  };

  static editUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { username, role } = req.body;

    const userRepository = getRepository(UserEntity);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      apiResponse.error(res, httpStatusCodes.NOT_FOUND, error);
      return;
    }

    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > 0) {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST, errors);
      return;
    }

    try {
      await userRepository.save(user);
    } catch (e) {
      apiResponse.error(res, httpStatusCodes.CONFLICT, 'user already in db');
      return;
    }
    apiResponse.success(res, { res: 'User updated' }, httpStatusCodes.NO_CONTENT);
  };

  static deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      apiResponse.error(res, httpStatusCodes.NOT_FOUND, error);
      return;
    }
    userRepository.delete(id);

    apiResponse.success(res, { res: 'User deleted' }, httpStatusCodes.NO_CONTENT);
  };
};

export default UserController;
