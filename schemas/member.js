const { body } = require('express-validator')

module.exports = {
  memberSchema: [
    body('name')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required'),
    body('facebookUrl').isString().trim().withMessage('must be a string')
      .notEmpty()
      .optional(),
    body('instagramUrl').isString().trim().withMessage('must be a string')
      .notEmpty()
      .optional(),
    body('linkedinUrl').isString().trim().withMessage('must be a string')
      .notEmpty()
      .optional(),
    body('image')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required'),
    body('description')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required'),
  ],
  updateMemberSchema: [
    body('name')
      .isString()
      .trim()
      .withMessage('must be a string')
      .notEmpty()
      .withMessage('required')
      .optional(),
    body('facebookUrl').isString().trim().withMessage('must be a string')
      .notEmpty()
      .optional(),
    body('instagramUrl').isString().trim().withMessage('must be a string')
      .notEmpty()
      .optional(),
    body('linkedinUrl').isString().trim().withMessage('must be a string')
      .notEmpty()
      .optional(),
    body('image')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required')
      .optional(),
    body('description')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required')
      .optional(),
  ],
}
