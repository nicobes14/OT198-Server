const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)
const ApiError = require('../helpers/ApiError')
const { uploadImageToS3 } = require('./uploadImageToS3')
const httpStatus = require('../helpers/httpStatus')
const db = require('../database/models')

const { Member } = db

module.exports = {
  createMember: async (req) => {
    try {
      const newMember = await Member.create(req.body)
      if (newMember) {
        if (req.file) {
          newMember.image = await uploadImageToS3(req)
          await newMember.save()
        }
      }
      return newMember
    } catch (error) {
      if (req.file) {
        await unlinkFile(req.file.path)
      }
      throw new ApiError(httpStatus.BAD_REQUEST, error.parent.code)
    }
  },
  updateMember: async (member, id) => {
    try {
      const editMember = await Member.update(member, {
        where: { id },
      })
      if (editMember[0] !== 1) throw new Error(`Member ${id} not found`)
      const memberUpdated = await Member.findByPk(id)
      return memberUpdated
    } catch (error) {
      throw new ApiError(httpStatus.NOT_FOUND, error.message)
    }
  },
}
