const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const services = require('../services/organization')

const { listOrganization, updateOrganization } = services

// find all Organization function
module.exports = {
  list: catchAsync(async (req, res, next) => {
    try {
      const publicData = await listOrganization()
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'Organizations public data retrieved successfully',
        body: publicData,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving organization public data] - [organization - listPublic]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  put: catchAsync(async (req, res, next) => {
    try {
      const { code, status, message } = await updateOrganization(1, req.body)
      endpointResponse({
        res,
        code,
        status,
        message,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating organization public data] - [organization - Update]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
