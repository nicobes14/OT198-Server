const { body } = require('express-validator')

const userSchema = [
  body('firstName')
    .isString()
    .trim()
    .withMessage('firstName has to be a string')
    .notEmpty()
    .withMessage('firstName is required'),
  body('lastName')
    .isString()
    .trim()
    .withMessage('lastName has to be a string')
    .notEmpty()
    .withMessage('lastName is required'),
  body('email')
    .isEmail()
    .trim()
    .withMessage('enter a valid email'),
  body('password')
    .isLength({ min: 8 })
    .trim()
    .withMessage('password must have at least 8 characters')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
    .withMessage('Must have at least 1 uppercase, 1 lowercase letter and 1 number'),
]

module.exports = userSchema
