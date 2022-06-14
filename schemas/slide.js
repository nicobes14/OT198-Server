const { body } = require('express-validator')

module.exports = {
  updateSlideSchema: [
    body('text').isString().withMessage('must be a string').trim()
      .optional(),
    body('order').toInt().isInt({ min: 1 }).withMessage('must be an interger')
      .trim()
      .optional(),
    body('organizationId')
      .toInt()
      .isInt({ min: 1 })
      .withMessage('must be an interger')
      .trim()
      .optional(),
  ],
  createSlideSchema: [
    body('text').isString().withMessage('must be a string').trim(),
    body('order').toInt().isInt({ min: 1 }).withMessage('must be an interger')
      .trim()
      .optional(),
    body('organizationId')
      .toInt()
      .isInt({ min: 1 })
      .withMessage('must be an interger')
      .trim()
      .optional(),
  ],
}
