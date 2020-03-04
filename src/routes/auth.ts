import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import { validate } from "../helper/Validator";
import { userLoginFormRules, changePasswordRules } from "../helper/ValidationRules";

const router = Router();
//Login route
router.post("/login", userLoginFormRules(), validate, AuthController.login);

//Change my password
router.post("/change-password", changePasswordRules(), validate, [checkJwt], AuthController.changePassword);

export default router;