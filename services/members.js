const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)
const ApiError = require('../helpers/ApiError')
const { uploadImageToS3 } = require('./uploadImageToS3')
const httpStatus = require('../helpers/httpStatus')
const db = require('../database/models')

const { Member } = db

module.exports = {
  listMembers: async (page) => {
    const allMembers = await Member.findAndCountAll({
      limit: 10,
      offset: 10 * (page - 1),
      order: [['createdAt', 'DESC']],
    })
    return allMembers
  },
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
  deleteMember: async (id) => {
    const deletedMember = await Member.destroy({
      where: { id },
    })
    if (!deletedMember) throw new ApiError(httpStatus.NOT_FOUND, `Member with id ${id} not found`)
    return true
  },
}
