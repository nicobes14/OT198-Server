const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { listCategories } = require('../services/categories')

const list = async (req, res, next) => {
  try {
    const categories = await listCategories()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: categories,
    })
  } catch (e) {
    const httpError = createHttpError(
      e.statusCode,
      `[Error retrieving index] - [index - GET]: ${e.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  list,
}
