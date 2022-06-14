const { body } = require('express-validator')

module.exports = {
  userRegisterSchema: [
    body('firstName')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
    body('lastName')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
    body('email')
      .isEmail()
      .trim()
      .withMessage('enter a valid email')
      .notEmpty()
      .withMessage('required'),
    body('password')
      .isLength({ min: 8 })
      .trim()
      .withMessage('password must have at least 8 characters')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/)
      .withMessage('Must have at least 1 uppercase, 1 lowercase letter and 1 number'),
  ],
  userLoginSchema: [
    body('email')
      .isEmail()
      .trim()
      .withMessage('enter a valid email')
      .notEmpty()
      .withMessage('required'),
    body('password')
      .isLength({ min: 8 })
      .trim()
      .withMessage('password must have at least 8 characters'),
  ],
}
