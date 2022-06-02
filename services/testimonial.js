const { Testimonial } = require('../database/models')

module.exports = {
  createTestimonial: async (testimonialToCreate) => {
    try {
      const newTestimonial = await Testimonial.create(testimonialToCreate)
      return newTestimonial
        ? {
          code: 201,
          status: true,
          message: 'Testimonial created successfully',
          body: newTestimonial,
        }
        : { code: 400, status: true, message: 'Testimonial not created' }
    } catch (error) {
      throw new Error(error)
    }
  },
}
