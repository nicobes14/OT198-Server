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
  createNew: async (body) => {
    body.type = 'news'
    const newCategory = await New.create(body)
    return newCategory
  },
  updateNew: async (idNew, data) => {
    const {
      name, content, image, type, categoryId,
    } = data
    const modifyNew = await New.update(
      {
        name,
        content,
        image,
        type,
        categoryId,
      },
      {
        where: { id: idNew },
      },
    )
    if (modifyNew !== 1) throw new ApiError(httpStatus.NOT_FOUND, `New ${idNew} not found`)
    const updatedNew = await this.getNewById(idNew)
    return updatedNew
  },
  deleteNew: async (idNew) => {
    const deletedNew = await New.destroy({
      where: { id: idNew },
    })
    if (deletedNew !== 1) throw new ApiError(httpStatus.NOT_FOUND, `New ${idNew} not found`)
    return deletedNew
  },
}
