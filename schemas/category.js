const { body } = require('express-validator')

module.exports = {
  categorySchema: [
    body('name')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
    body('description').isString().trim().withMessage('must be a string')
      .optional(),
    body('image').isString().trim().withMessage('must be a string')
      .optional(),
  ],
}
