const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')

const db = require('../database/models')

const { Members } = db

module.exports = {
  list: async (req, res, next) => {
    try {
      const members = await Members.findAll()
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
  },
}
