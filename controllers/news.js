const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const {
  getNewById, createNew, updateNew, deleteNew,
} = require('../services/news')

module.exports = {
  listNews: async (req, res, next) => {
    try {
      const { id } = req.params
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
  },
  post: async (req, res, next) => {
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
  },
  update: async (req, res, next) => {
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
  },
  destroy: async (req, res, next) => {
    const { id } = req.params
    try {
      const result = await deleteNew(id)
      endpointResponse({
        res,
        ...result,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error with database] - [delete New - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  },
}
