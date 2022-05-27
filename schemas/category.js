const { body } = require('express-validator')

const categorySchema = [
  body('name')
    .isString()
    .trim()
    .withMessage('name has to be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('description').isString().trim().withMessage('description has to be a string')
    .optional(),
  body('image').isString().trim().withMessage('image has to be string')
    .optional(),
]

module.exports = categorySchema
