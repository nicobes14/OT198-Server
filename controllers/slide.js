const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { listSlide, listSlideById } = require('../services/slide')

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

// find by Id Slide function

const listById = async (req, res, next) => {
  const { id } = req.params
  try {
    const slide = await listSlideById(id)
    if (!slide) throw next(createHttpError(404, `Slide with id ${id} not found`))
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Slide found',
      body: slide,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statuscode,
      `[Error retrieving slide] - [listSlide By Id - GET]: ${error.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  list, listById,
}
