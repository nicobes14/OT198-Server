const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  listSlide, listSlideById, updateSlide, deleteSlide,
} = require('../services/slide')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  list: catchAsync(async (req, res, next) => {
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
  }),
  listById: catchAsync(async (req, res, next) => {
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
  }),
  update: catchAsync(async (req, res) => {
    const { id } = req.params
    const {
      text, order, organizationId, imageURL,
    } = req.body
    const updatedSlide = await updateSlide(
      id,
      {
        text,
        order,
        imageURL,
        organizationId,
      },
      req,
    )
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Slide updated',
      body: updatedSlide,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    const status = await deleteSlide(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status,
      message: 'Slide deleted',
    })
  }),
}
