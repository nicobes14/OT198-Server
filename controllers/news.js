const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { getNewById } = require('../services/news')

const listNews = async (req, res, next) => {
  try {
    const { id } = req.Params
    if (id) {
      const result = await getNewById(id)
      if (!result) {
        next(createHttpError(404, 'New not found'))
      }
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'successfully retrieved',
        body: result,
      })
    }
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving index] - [index - GET]: ${error.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  listNews,
}
