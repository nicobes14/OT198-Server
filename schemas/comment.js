const { body } = require('express-validator')

const newCommentSchema = [
  body('userId')
    .toInt()
    .isInt({ min: 1 })
    .withMessage('UserId must be an interger')
    .notEmpty()
    .withMessage('UserId is required'),
  body('body')
    .isString()
    .withMessage('Body must be a string')
    .trim()
    .notEmpty()
    .withMessage('Body is required'),
  body('newId')
    .toInt()
    .isInt({ min: 1 })
    .withMessage('NewId must be an interger')
    .notEmpty()
    .withMessage('NewId is required'),
]
const commentSchema = [body('body').isString().withMessage('must be a string').trim()]

module.exports = { commentSchema, newCommentSchema }
