const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)
const { uploadImageToS3 } = require('./uploadImageToS3')
const { New } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  listNews: async (page) => {
    const allNews = await New.findAndCountAll({
      limit: 10,
      offset: 10 * (page - 1),
      order: [['createdAt', 'DESC']],
    })
    return allNews
  },
  getNewById: async (id) => {
    const result = await New.findByPk(id)
    if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'New not found')
    return result
  },
  createNew: async (req) => {
    try {
      req.body.type = 'news'
      const newNew = await New.create(req.body)
      if (newNew && req.file) {
        newNew.image = await uploadImageToS3(req)
        await newNew.save()
      }
      return newNew
    } catch (error) {
      if (req.file) {
        await unlinkFile(req.file.path)
      }
      throw new ApiError(httpStatus.BAD_REQUEST, error.parent.code)
    }
  },
  updateNew: async (req) => {
    const { id } = req.params
    try {
      const editedNew = await New.update(req.body, {
        where: { id },
      })
      if (editedNew[0] !== 1) throw new Error(`New ${id} not found`)
      const updatedNew = await New.findByPk(id)
      if (req.file) {
        updatedNew.image = await uploadImageToS3(req)
        await updatedNew.save()
      }
      return updatedNew
    } catch (error) {
      if (req.file) {
        await unlinkFile(req.file.path)
      }
      throw new ApiError(httpStatus.NOT_FOUND, error.message)
    }
  },
  deleteNew: async (idNew) => {
    const deletedNew = await New.destroy({
      where: { id: idNew },
    })
    if (deletedNew !== 1) throw new ApiError(httpStatus.NOT_FOUND, `New ${idNew} not found`)
    return deletedNew
  },
}
