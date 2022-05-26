const db = require('../database/models')

const { Organization } = db

exports.listOrganization = async () => {
  try {
    return await Organization.findAll({ attributes: ['name', 'image', 'phone', 'address'] })
  } catch (error) {
    throw new Error(error)
  }
}
