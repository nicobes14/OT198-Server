const bcrypt = require('bcrypt')
const { User } = require('../database/models')

module.exports = {
  createUser: async (data) => {
    const {
      firstName, lastName, email, password,
    } = data
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12),
      })
      return user
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
      return {
        code: 200,
        status: true,
        message: 'User logged in',
        body: user,
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteUser: async (id) => {
    try {
      const user = await User.destroy({
        where: { id },
      })
      return user === 1 ? { code: 200, status: true, message: 'User deleted' } : { code: 400, status: false, message: `User ${id} not found` }
    } catch (error) {
      throw new Error(error)
    }
  },
}
