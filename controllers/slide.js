const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const listSlide = require('../services/slide')

// find all Slide function

const list = async (req, res, next) => {
  try {
    const slide = await listSlide()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'slide found',
      body: slide,
    })
  } catch (error) {
    const httpError = createHttpError(error.statuscode, `[Error retrieving slide] - [slide - GET]: ${error.message}`)
    next(httpError)
  }
}

module.exports = {
  list,
}
