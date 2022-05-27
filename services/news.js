const db = require('../database/models')

const { New } = db

const getNewById = async (id) => {
  try {
    const result = await New.findByPk(id)
    return result
  } catch (error) {
    return error
  }
}

const createNew = async (body) => {
  try {
    body.type = 'news'
    const newCategory = await New.create(body)
    return newCategory
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getNewById,
  createNew,
}
