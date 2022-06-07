const util = require('util')
const fs = require('fs')
const { Testimonial } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')
const { uploadImageToS3 } = require('./uploadImageToS3')

const unlinkFile = util.promisify(fs.unlink)

module.exports = {
  /**
   * Create a testimonial
   *
   * @param {request} request object with the testimonial data and the image in req.file
   * @returns {object} testimonial created with the data provided in the request body or an error
   */
  createTestimonial: async (request) => {
    try {
      const newTestimonial = await Testimonial.create(request.body)
      if (request.file) newTestimonial.image = await uploadImageToS3(request)
      await newTestimonial.save()

      return newTestimonial
    } catch (error) {
      if (request.file) await unlinkFile(request.file.path)
      throw new ApiError(httpStatus.BAD_REQUEST, error.message)
    }
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
  /**
   * Update a testimonial
   *
   * @param {object} testimonialToUpdate the testimonial to update in the
   * database with the new values
   * @param {request} req the request object from the client to upload the image
   * @return {object} the testimonial updated or an error
   */
  updateTestimonial: async (testimonialToUpdate, req) => {
    const { id } = testimonialToUpdate
    const testimonial = await Testimonial.findByPk(id)
    if (!testimonial) {
      if (testimonialToUpdate.image) await unlinkFile(req.file.path)
      throw new ApiError(httpStatus.NOT_FOUND, `Testimonial with id ${id} not found`)
    }
    if (!testimonialToUpdate.image) {
      testimonialToUpdate.image = testimonial.image
    } else {
      try {
        testimonialToUpdate.image = await uploadImageToS3(req)
      } catch (error) {
        await testimonial.update(testimonialToUpdate)
        if (testimonialToUpdate.image) await unlinkFile(req.file.path)
        throw new ApiError(
          httpStatus.PARTIAL_CONTENT,
          'Testimonial content updated but there is a error uploading image',
        )
      }
    }

    const updatedTestimonial = await testimonial.update(testimonialToUpdate)
    return updatedTestimonial.dataValues
  },
}
