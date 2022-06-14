const { body } = require('express-validator')

module.exports = {
  newCommentSchema: [
    body('userId')
      .toInt()
      .isInt({ min: 1 })
      .withMessage('must be an interger')
      .notEmpty()
      .withMessage('required'),
    body('body')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required'),
    body('newId')
      .toInt()
      .isInt({ min: 1 })
      .withMessage('must be an interger')
      .notEmpty()
      .withMessage('required'),
  ],
  updateCommentSchema: [body('body').isString().withMessage('must be a string').trim()],
}
