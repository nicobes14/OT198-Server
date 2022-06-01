const jwt = require('jsonwebtoken')
const { User } = require('../database/models')
const authConfig = require('../config/auth')
const { endpointResponse } = require('../helpers/success')

module.exports = {
  validateToken: (token, req, res, next) => {
    jwt.verify(token, authConfig.secret, async (err, decoded) => {
      if (err) {
        endpointResponse({
          res,
          code: 403,
          status: true,
          message: 'Token not decoded.',
        })
      } else {
        const user = await User.findByPk(decoded.user.id)
        req.user = user
        next()
      }
    })
  },
}
