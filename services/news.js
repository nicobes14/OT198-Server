const { New } = require('../database/models')

module.exports = {
  getNewById: async (id) => {
    try {
      const result = await New.findByPk(id)
      return result
    } catch (error) {
      return error
    }
  },
  createNew: async (body) => {
    try {
      body.type = 'news'
      const newCategory = await New.create(body)
      return newCategory
    } catch (error) {
      throw new Error(error)
    }
  },
  updateNew: async (idNew, data) => {
    try {
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
      const updatedNew = await this.getNewById(idNew)
      return modifyNew === 1
        ? {
          code: 200,
          status: true,
          message: `New ${idNew} updated`,
          body: updatedNew,
        }
        : {
          code: 404,
          status: false,
          message: `New ${idNew} not found`,
          body: { ok: false },
        }
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteNew: async (idNew) => {
    try {
      const deletedNew = await New.destroy({
        where: { id: idNew },
      })
      return deletedNew === 1
        ? {
          code: 200,
          status: true,
          message: `New ${idNew} deleted`,
        }
        : {
          code: 404,
          status: false,
          message: `New ${idNew} not found`,
        }
    } catch (error) {
      throw new Error(error)
    }
  },
}
