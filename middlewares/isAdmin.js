const { endpointResponse } = require('../helpers/success')

module.exports = {
  isAdmin: async (req, res, next) => {
    if (req.user.roleId !== 1) {
      endpointResponse({
        res,
        code: 401,
        status: true,
        message: 'Not allowed',
      })
    } else {
      next()
    }
  },
}
