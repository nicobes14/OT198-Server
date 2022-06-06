const bcrypt = require('bcrypt')
const { User } = require('../database/models')
const { sendWelcomeEmail } = require('./sendgrid')
const ApiError = require('../helpers/ApiError')
const { generateToken } = require('../middlewares/jwt')

module.exports = {
  createUser: async (data) => {
    const {
      firstName, lastName, email, password,
    } = data
    try {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          firstName,
          lastName,
          email,
          password: bcrypt.hashSync(password, 12),
        },
      })
      if (!created) throw new ApiError(409, 'Email already exists')
      await sendWelcomeEmail(email)
      const token = generateToken(user.dataValues)
      return { user, token }
    } catch (error) {
      throw new Error(error)
    }
  },
  getAllUsers: async () => {
    try {
      const users = await User.findAll()
      return users
        ? {
          code: 200,
          status: true,
          message: 'Users listed',
          body: users,
        }
        : { code: 404, status: false, message: 'Users not found' }
    } catch (error) {
      throw new Error(error)
    }
  },
  getUserWithEmail: async ({ email, password }) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return {
          code: 401,
          status: false,
          message: 'Invalid credentials',
          body: { ok: false },
        }
      }
      const token = generateToken(user.dataValues)
      return {
        code: 200,
        status: true,
        message: 'User logged in',
        body: { user, token },
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  updateUser: async (req) => {
    const {
      firstName, lastName, email, password,
    } = req.body
    const idUser = req.params.id
    try {
      const userExist = await User.findOne({ where: { id: idUser } })
      if (!userExist) {
        return {
          code: 404,
          status: false,
          message: 'User not found',
          body: { ok: false },
        }
      }
      const result = await User.update(
        {
          firstName,
          lastName,
          email,
          password: bcrypt.hashSync(password, 12),
        },
        {
          where: { id: idUser },
        },
      )
      return result
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteUser: async (id) => {
    try {
      const user = await User.destroy({
        where: { id },
      })
      return user === 1
        ? { code: 200, status: true, message: 'User deleted' }
        : { code: 400, status: false, message: `User ${id} not found` }
    } catch (error) {
      throw new Error(error)
    }
  },
}
