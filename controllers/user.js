const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const db = require('../database/models')
const { createUser } = require('../services/user')

const { User } = db

// find all testimonials function
const allUsers = async (req, res, next) => {
  try {
    const Users = await User.findAll()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: Users,
    })
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error showing all testimonials: ${err.message}`,
    )
    next(httpError)
  }
}

// create new users
const post = async (req, res, next) => {
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
}

module.exports = {
  allUsers,
  post,
}
