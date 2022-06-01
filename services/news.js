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

const updateNew = async (idNew, data) => {
  try {
    const {
      name, content, image, type, categoryId,
    } = data
    const modifyNew = await New.update({
      name,
      content,
      image,
      type,
      categoryId,
    }, {
      where: { id: idNew },
    })
    const updatedNew = await getNewById(idNew)
    return modifyNew === 1 ? {
      code: 200, status: true, message: `New ${idNew} updated`, body: updatedNew,
    } : {
      code: 404, status: false, message: `New ${idNew} not found`, body: { ok: false },
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getNewById,
  createNew,
  updateNew,
}
