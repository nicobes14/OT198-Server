const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const {
  createUser,
  getUserWithEmail,
  deleteUser,
  updateUser,
  getAllUsers,
} = require('../services/user')

module.exports = {
  list: async (req, res, next) => {
    try {
      const {
        code, status, message, body,
      } = await getAllUsers()
      endpointResponse({
        res,
        code,
        status,
        message,
        body,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error getting all users] - [users - GET]: ${error.message}`,
      )
      next(httpError)
    }
  },
  post: async (req, res, next) => {
    try {
      const user = await createUser(req.body)
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'User created',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error posting new user] - [users - POST]: ${error.message}`,
      )
      next(httpError)
    }
  },
  login: async (req, res, next) => {
    const { email, password } = req.body
    try {
      const {
        code, status, message, body,
      } = await getUserWithEmail({ email, password })
      endpointResponse({
        res,
        code,
        status,
        message,
        body,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error logging in user] - [users - tryLogin]: ${error.message}`,
      )
      next(httpError)
    }
  },
  put: async (req, res, next) => {
    try {
      const user = await updateUser(req)
      endpointResponse({
        res,
        code: 200,
        status: true,
        message: 'User updated',
        body: user,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating user] - [users - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  },
  destroy: async (req, res, next) => {
    const { id } = req.params
    try {
      const { code, status, message } = await deleteUser(id)
      endpointResponse({
        res,
        code,
        status,
        message,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [users - DELETE]: ${error.message}`,
      )
      next(httpError)
    }
  },
}
