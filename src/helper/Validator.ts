// const { body, validationResult } = require('express-validator')
import { matchedData, validationResult } from "express-validator";
import * as httpStatusCodes from 'http-status-codes';
import apiResponse from '../utilities/apiResponse';

export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, extractedErrors);
}