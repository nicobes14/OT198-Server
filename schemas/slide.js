const { body } = require('express-validator')

module.exports = {
  updateSlideSchema: [
    body('text').isString().withMessage('must be a string').trim()
      .optional(),
    body('order').isInt().withMessage('must be an integer').trim()
      .optional(),
    body('organizationId').isInt().withMessage('must be an integer').trim()
      .optional(),
  ],
}
