const { body } = require('express-validator')

const activitySchema = [
  body('name').isString().trim().withMessage('must be a string')
    .notEmpty()
    .withMessage('must complete name'),
  body('content').isString().trim().withMessage('must be complete')
    .notEmpty()
    .withMessage('complete content'),
]

module.exports = activitySchema
