const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const db = require('../database/models')

const { Testimonial } = db

// find all testimonials function
const showAll = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.findAll()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: testimonials,
    })
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error showing all testimonials: ${err.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  showAll,
}
