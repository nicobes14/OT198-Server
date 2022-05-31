const { body } = require('express-validator')

module.exports = {
  organizationSchema: [
    body('name')
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
    body('address').isString().withMessage('must be a string').trim()
      .optional(),
    body('phone').toInt().isInt().trim()
      .optional(),
    body('email')
      .isEmail()
      .withMessage('enter a valid email')
      .trim()
      .notEmpty()
      .withMessage('required'),
    body('facebookUrl').isURL().withMessage('must be a URL').trim()
      .optional(),
    body('instagramUrl').isURL().withMessage('must be a URL').trim()
      .optional(),
    body('linkedinUrl').isURL().withMessage('must be a URL').trim()
      .optional(),
    body('welcomeText')
      .isString()
      .withMessage('must be a string')
      .trim()
      .notEmpty()
      .withMessage('required'),
    body('aboutUsText').isString().withMessage('must be a string').trim()
      .optional(),
  ],
}
