const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

const db = require('../database/models')

const { Slide } = db

// find all Slide function
module.exports = {
  list: catchAsync(async (req, res, next) => {
    try {
      const slides = await Slide.findAll()
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'Slides retrieved successfully',
        body: slides,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving slide] - [Slide - list]: ${error.message}`,
      )
      next(httpError)
    }
  }),
}
