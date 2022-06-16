const ApiError = require('../helpers/ApiError')
const { decodeToken } = require('./jwt')
const db = require('../database/models/index')
const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')
const Roles = require('../constants/roles')

module.exports = (entity) => catchAsync(async (req, res, next) => {
  const result = await db[entity].findByPk(req.params.id)
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, `element of ${entity} with id ${req.params.id} not found`)

  const userId = entity === 'User' ? result.id : result.userId
  const user = decodeToken(req)

  if (user.roleId === Roles.ADMIN || user.id === userId) {
    next()
  } else {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not allowed to do this')
  }
})
