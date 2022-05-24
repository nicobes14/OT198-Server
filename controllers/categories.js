const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const db = require('../database/models')

const { Category } = db

module.exports = {
  list: catchAsync(async (req, res, next) => {
    try {
      const categories = await Category.findAll()
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
  }),
}
