const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
const { endpointResponse } = require('../helpers/success')

module.exports = {
  ownershipValidate: async (req, res, next) => {
    const token = req.header('authorization').split(' ')[1]
    const { user } = jwt.verify(token, authConfig.secret)
    if (user.roleId === 1 || user.id === +req.params.id) {
      next()
    } else {
      endpointResponse({
        res,
        code: 403,
        status: false,
        message: 'Forbidden',
      })
    }
  },
}
