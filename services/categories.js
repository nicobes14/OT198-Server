const db = require('../database/models')

const { Category } = db

const listCategories = async () => {
  try {
    const categories = await Category.findAll({ attributes: ['name'] })
    return categories
  } catch (e) {
    return e
  }
}

module.exports = {
  listCategories,
}
