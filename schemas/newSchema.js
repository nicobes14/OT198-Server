const { body } = require('express-validator')

const newSchema = [
  body('name').isString().withMessage('must be a string').trim()
    .notEmpty()
    .withMessage('required'),
  body('content')
    .isString()
    .withMessage('must be a string')
    .trim()
    .notEmpty()
    .withMessage('required'),
  body('image')
    .isString()
    .withMessage('must be a string')
    .trim()
    .notEmpty()
    .withMessage('required'),
  body('categoryId').toInt().isInt().notEmpty()
    .withMessage('required'),
]

module.exports = newSchema
