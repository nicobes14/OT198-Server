const ApiError = require('../helpers/ApiError')
const { decodeToken } = require('./jwt')
const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')
const Roles = require('../constants/roles')

module.exports = {
  ownershipValidate: catchAsync(async (req, res, next) => {
    const user = decodeToken(req)
    if (user.roleId === Roles.ADMIN || user.id === +req.params.id) {
      next()
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'You are not allowed to do this')
    }
  }),
}
