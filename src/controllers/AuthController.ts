import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as httpStatusCodes from 'http-status-codes';
import apiResponse from '../utilities/apiResponse';
import { User as UserEntity } from "../entity/UserEntity";
import config from "../config/config";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    console.log('req.body', req.body)
    if (!(username && password)) {
      apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
      return;
    }

    //Get user from database
    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      // res.status(401).send({ erroor: error });
      apiResponse.error(res, httpStatusCodes.FORBIDDEN, error);
      return;
    }
    console.log('user', user);
    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      // res.status(401).send();
      apiResponse.error(res, httpStatusCodes.FORBIDDEN);
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "30d" }
    );

    //Send the jwt in the response
    apiResponse.success(res, { token: token }, httpStatusCodes.OK);
    // res.send({ token: token });
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { old_password, new_password } = req.body;
    if (!(old_password && new_password)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(old_password)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = new_password;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
