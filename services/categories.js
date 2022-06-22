const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)

const { Category } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')
const { uploadImageToS3 } = require('./uploadImageToS3')

module.exports = {
  listCategories: async (page) => {
    const categories = await Category.findAndCountAll({
      attributes: ['name'],
      limit: 10,
      offset: 10 * (page - 1),
      order: [['createdAt', 'DESC']],
    })
    return categories
  },
  listCategoryById: async (id) => {
    const category = await Category.findByPk(id)
    if (!category) throw new ApiError(httpStatus.NOT_FOUND, 'Category not found')
    return category
  },
  updateCategory: async (id, req) => {
    try {
      const editCategory = await Category.update(req.body, {
        where: { id },
      })
      if (editCategory[0] !== 1) {
        throw new ApiError(httpStatus.NOT_FOUND, `Category with id ${id} not found`)
      }
      const updatedCategory = await Category.findByPk(id)
      if (req.file) {
        updatedCategory.image = await uploadImageToS3(req)
        await updatedCategory.save()
      }
      return updatedCategory
    } catch (error) {
      if (req.file) {
        await unlinkFile(req.file.path)
      }
      throw new ApiError(httpStatus.NOT_FOUND, error.message)
    }
  },
  createCategory: async (req) => {
    try {
      const newCategory = await Category.create(req.body)
      if (newCategory) {
        if (req.file) {
          newCategory.image = await uploadImageToS3(req)
          await newCategory.save()
        }
      }
      return newCategory
    } catch (error) {
      if (req.file) {
        await unlinkFile(req.file.path)
      }
      throw new ApiError(httpStatus.BAD_REQUEST, error.parent.code)
    }
  },
  deleteCategory: async (id) => {
    const user = await Category.destroy({
      where: { id },
    })
    if (user !== 1) throw new ApiError(httpStatus.NOT_FOUND, `Category with id ${id} not found`)
    return user
  },
}
