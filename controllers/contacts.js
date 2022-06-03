const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { listAllContacts, createContact } = require('../services/contacts')

module.exports = {
  list: catchAsync(async (req, res, next) => {
    try {
      const {
        code, status, message, body,
      } = await listAllContacts()
      endpointResponse({
        res,
        code,
        status,
        message,
        body,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving contacts] - [contacts - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  post: async (req, res, next) => {
    try {
      const createdContact = await createContact(req.body)
      endpointResponse({
        res,
        code: 201,
        status: true,
        message: 'Contact created',
        body: createdContact,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error with database] - [create Contact - POST]: ${error.message}`,
      )
      next(httpError)
    }
  },
}
