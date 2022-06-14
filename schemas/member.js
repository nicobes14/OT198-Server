const { body } = require('express-validator')

const memberSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('name has to be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('image')
    .isString()
    .withMessage('Image must be a string')
    .trim()
    .notEmpty()
    .withMessage('required'),
  body('description')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .notEmpty()
    .withMessage('required'),
]

const updateMemberSchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('name has to be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('image')
    .isString()
    .withMessage('Image must be a string')
    .trim()
    .notEmpty()
    .withMessage('required')
    .optional(),
  body('description')
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .notEmpty()
    .withMessage('required'),
]

module.exports = { memberSchema, updateMemberSchema }
