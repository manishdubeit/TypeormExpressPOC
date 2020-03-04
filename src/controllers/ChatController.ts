import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { Message } from '../chat-model';

class ChatController {
  static message = async (req: Request, res: Response) => {
    const io = req.app.get('socketio');
    console.log('chat controller');
  
  };
}
export default ChatController;
