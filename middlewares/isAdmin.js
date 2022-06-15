const ApiError = require('../helpers/ApiError')
const { catchAsync } = require('../helpers/catchAsync')
const httpStatus = require('../helpers/httpStatus')
const { decodeToken } = require('./jwt')
const Roles = require('../constants/roles')

module.exports = {
  isAdmin: catchAsync(async (req, res, next) => {
    const user = decodeToken(req)
    if (user.roleId !== Roles.ADMIN) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not an admin')
    } else {
      next()
    }
  }),
}
