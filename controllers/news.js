const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { getNewById, createNew, updateNew } = require('../services/news')

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

const post = catchAsync(async (req, res, next) => {
  try {
    const createdNew = await createNew(req.body)
    endpointResponse({
      res,
      code: 201,
      status: true,
      message: 'New created',
      body: createdNew,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [create New - POST]: ${error.message}`,
    )
    next(httpError)
  }
})

const update = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const data = req.body
  try {
    const {
      code, status, message, body,
    } = await updateNew(id, data)
    endpointResponse({
      res,
      code,
      status,
      message,
      body,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [update New - PUT]: ${error.message}`,
    )
    next(httpError)
  }
})

module.exports = {
  listNews,
  post,
  update,
}
