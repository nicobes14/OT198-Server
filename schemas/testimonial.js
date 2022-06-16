const { body } = require('express-validator')

module.exports = {
  createTestimonialSchema: [
    body('name')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required'),
    body('image').isString().withMessage('must be a string').trim()
      .optional(),
    body('content')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required'),
  ],
  updateTestimonialSchema: [
    body('name').notEmpty().isString().withMessage('must be a string')
      .trim()
      .optional(),
    body('image').isString().withMessage('must be a string').trim()
      .optional(),
    body('content').notEmpty().isString().withMessage('must be a string')
      .trim()
      .optional(),
  ],
}
