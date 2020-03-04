import { Router } from "express";
import ChatController from "../controllers/ChatController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Chat route
console.log('aaa');
router.get("/", ChatController.message);

export default router;