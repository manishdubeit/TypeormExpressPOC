import { Response } from 'express';
import * as httpStatusCodes from 'http-status-codes';


export interface ICookie {
  key: string;
  value: string;
}
export default class ApiResponse {
  static success = (res: Response, data: object,
    status: number = 200,
    cookie: ICookie = null) => {
    res.status(status);
    if (cookie) {
      res.cookie(cookie.key, cookie.value);
    }
    res.json({
      data,
      success: true,
    });
  }

  static error = (res: Response,
    status: number = 400,
    data?: any,
    error: any = httpStatusCodes.getStatusText(status),
  ) => {
    res.status(status).json({
      error: {
        code: status,
        message: error,
        data: data,
      },
      success: false,
    });
  }
}
