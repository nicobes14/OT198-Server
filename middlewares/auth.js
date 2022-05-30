const createHttpError = require('http-errors')
const { validateToken } = require('./jwt')
const { endpointResponse } = require('../helpers/success')

module.exports = {
  auth: (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        endpointResponse({
          res,
          code: 403,
          status: true,
          message: 'Access not authorized.',
        })
      } else {
        const token = req.headers.authorization.split(' ')[1]
        validateToken(token)
      }
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error decoding token] - [auth]: ${error.message}`,
      )
      next(httpError)
    }
  },
}
