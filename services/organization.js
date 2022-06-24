const { Op } = require('sequelize')
const { Organization } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  listOrganization: async () => {
    const allOrganizations = await Organization.findAll({
      attributes: [
        'name',
        'image',
        'phone',
        'address',
        'facebookUrl',
        'instagramUrl',
        'linkedinUrl',
      ],
    })
    return allOrganizations
  },

  updateOrganization: async (newData) => {
    const updatedData = await Organization.update(newData, { where: { id: { [Op.gte]: 1 } } })
    const [result] = updatedData
    if (result === 0) throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found')
    const updatedOrganization = await Organization.findAll()
    return updatedOrganization
  },
}
