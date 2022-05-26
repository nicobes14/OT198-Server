const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const services = require('../services/organization')

const { listOrganization } = services

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
}
