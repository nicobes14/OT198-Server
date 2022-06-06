const { Testimonial } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  /**
   * Create a testimonial
   *
   * @param {object} testimonialToCreate object with the testimonial data
   * @returns {object} testimonial created with the data provided in the request body or an error
   */
  createTestimonial: async (testimonialToCreate) => {
    const newTestimonial = await Testimonial.create(testimonialToCreate)
    return newTestimonial
  },

  /**
   * Delete a testimonial
   *
   * @param {number} idTestimonial the id of the testimonial to delete
   */
  deleteTestimonial: async (idTestimonial) => {
    const deleted = await Testimonial.destroy({ where: { id: idTestimonial } })
    if (!deleted) throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found')
  },
}
