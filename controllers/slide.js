const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const services = require('../services/slide')

const { listSlide } = services

// find all Slide function

const list = catchAsync(async (req, res, next) => {
  try {
    const publicData = await listSlide()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Slides public data retrieved successfully',
      body: publicData,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving slide public data] - [slide - listPublic]: ${error.message}`,
    )
    next(httpError)
  }
})

module.exports = {
  list,
}
