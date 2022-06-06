const httpStatus = require('../helpers/httpStatus')
const { validateToken } = require('./jwt')
const ApiError = require('../helpers/ApiError')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
  auth: catchAsync(async (req, res, next) => {
    if (!req.headers.authorization) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'No authorization header')
    }
    if (validateToken(req)) next()
  }),
}
