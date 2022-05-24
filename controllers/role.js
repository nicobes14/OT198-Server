const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const Role = require('../database/models/role')

const list = async (req, res, next) => {
  try {
    const roles = await Role.findAll()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: roles,
    })
  } catch (err) {
    const httpError = createHttpError(err.statusCode, `Error showing all roles: ${err.message}`)
    next(httpError)
  }
}

module.export = {
  list,
}
