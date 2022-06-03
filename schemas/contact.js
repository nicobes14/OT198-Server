const { body } = require('express-validator')

const contactSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('Name has to be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .trim()
    .withMessage('enter a valid email')
    .notEmpty()
    .withMessage('Email is required'),
]

module.exports = contactSchema
