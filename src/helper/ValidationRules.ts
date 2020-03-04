import { body, check } from "express-validator";

export const userLoginFormRules = () => {
    return [
        // username must be an email
        body('username').notEmpty(),
        // password must be at least 5 chars long
        body('password').isLength({ min: 5 }),
    ]
}

export const changePasswordRules = () => {
    return [
        check('oldPassword', 'This field is required').notEmpty(),
        // password must be at least 5 chars long
        check('newPassword', '').isLength({ min: 5 }).exists(),
        check('passwordConfirmation', 'passwordConfirmation field must have the same value as the password field')
            .exists()
            .custom((value, { req }) => value === req.body.newPassword)
    ]
}