const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const db = require('../database/models')

const { Member } = db

module.exports = {
  list: catchAsync(async (req, res, next) => {
    try {
      const members = await Member.findAll()
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: members,
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
