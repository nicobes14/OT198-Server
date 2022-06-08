const { body } = require('express-validator')

const contactSchema = [body('body').isString().withMessage('must be a string').trim()]

module.exports = contactSchema
