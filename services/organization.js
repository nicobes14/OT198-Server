const db = require('../database/models')

const { Organization } = db

module.exports = {
  listOrganization: async () => {
    try {
      return await Organization.findAll({ attributes: ['name', 'image', 'phone', 'address'] })
    } catch (error) {
      throw new Error(error)
    }
  },
  updateOrganization: async (id, newData) => {
    try {
      const updatedData = await Organization.update(newData, { where: { id: `${id}` } })
      const [result] = updatedData
      return result === 1
        ? { code: 200, status: true, message: 'Organization Updated' }
        : { code: 404, status: false, message: 'Organization not found' }
    } catch (error) {
      throw new Error(error)
    }
  },
}
