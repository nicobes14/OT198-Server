const jwt = require('jsonwebtoken')
const { User } = require('../database/models')
const authConfig = require('../config/auth')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  /**
   * Devuelve si el token es valido
   *
   * @param {request} req la request que se esta ejecutando
   * @return {boolean} true si el token es valido, throw error si no lo es
   */
  validateToken: async (req) => {
    const cleanToken = req.headers.authorization.split(' ')[1]
    try {
      jwt.verify(cleanToken, authConfig.secret)
      return true
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, error.message)
    }
  },

  /**
   * Devuelve el token generado
   *
   * @param {Object} user los datos del usuario que se van a guardar en el token
   * @return {string} el token generado
   */
  generateToken: async (user) => {
    const { password, ...userWithoutPassword } = user
    const token = await jwt.sign({ user: userWithoutPassword }, authConfig.secret, {
      expiresIn: authConfig.expires,
    })
    return token
  },

  /**
   * Devuelve el usuario que esta en el token
   *
   * @param {string} req el token que se va a decodificar
   * @return {object} el usuario que esta en el token
   */
  decodeToken: async (req) => {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const { user } = jwt.verify(token, authConfig.secret)

      const userFromDB = await User.findByPk(user.id) // preguntar a gabo si esto es conveniente

      return userFromDB.dataValues
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
    }
  },
}
