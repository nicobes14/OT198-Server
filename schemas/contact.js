const { body } = require('express-validator')

module.exports = {
  contactSchema: [
    body('name')
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
  ],
}
