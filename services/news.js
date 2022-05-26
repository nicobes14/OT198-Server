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

module.exports = {
  getNewById,
}
