const db = require('../database/models')

const { Category } = db
// todo - create a error handler
const listCategoryById = async (id) => {
  try {
    const category = await Category.findByPk(id)
    return category
  } catch (error) {
    throw new Error(error)
  }
}

const listCategories = async () => {
  try {
    const categories = await Category.findAll({ attributes: ['name'] })
    return categories
  } catch (error) {
    throw new Error(error)
  }
}

const createCategory = async (category) => {
  try {
    const newCategory = await Category.create(category)
    return newCategory
  } catch (error) {
    throw new Error(error)
  }
}

const deleteCategory = async (id) => {
  try {
    const user = await Category.destroy({
      where: { id },
    })
    return user === 1
      ? { code: 200, status: true, message: 'Category deleted' }
      : { code: 404, status: false, message: `Category with id ${id} not found` }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  listCategories,
  listCategoryById,
  createCategory,
  deleteCategory,
}
