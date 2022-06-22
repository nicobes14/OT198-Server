const { body } = require('express-validator')

module.exports = {
  newSchema: [
    body('name')
      .isString()
      .withMessage('must be a string')
      .trim()
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
    body('categoryId')
      .toInt()
      .isInt({ min: 1 })
      .withMessage('must be an interger')
      .notEmpty()
      .withMessage('required'),
  ],
  updateNewSchema: [
    body('name')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required')
      .optional(),
    body('content')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required')
      .optional(),
    body('image')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required')
      .optional(),
    body('categoryId')
      .toInt()
      .isInt({ min: 1 })
      .withMessage('must be an interger')
      .notEmpty()
      .withMessage('required')
      .optional(),
  ],
}
