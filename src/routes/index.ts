import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import photo from "./photo";
import chat from "./chat";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/photo", photo);
routes.use("/chat", chat);

export default routes;
