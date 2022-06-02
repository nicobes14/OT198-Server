const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { createTestimonial } = require('../services/testimonial')

module.exports = {
  post: async (req, res, next) => {
    try {
      const { name, content, image } = req.body
      const response = await createTestimonial({ name, content, image })
      return endpointResponse({ res, ...response })
    } catch (error) {
      return next(createHttpError(500, error))
    }
  },
}
