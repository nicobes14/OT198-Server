const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const db = require('../database/models')

const { Organization } = db

// find all Organization function
module.exports = {
  list: catchAsync(async (req, res, next) => {
    try {
      const organizations = await Organization.findAll()
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'Organizations retrieved successfully',
        body: organizations,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving organization] - [organization - list]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
