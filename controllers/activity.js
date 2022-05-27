const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')

const { listActivity, postActivity } = require('../services/activity')

// find all activities

const ShowAll = async (req, res, next) => {
  try {
    const activities = await listActivity()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: activities,
    })
  } catch (err) {
    const httpError = createHttpError(
      err.statusCode,
      `Error showing all activities: ${err.message}`,
    )
    next(httpError)
  }
}

const post = async (req, res, next) => {
  try {
    const { name, image, content } = req.body
    const newActivity = await postActivity({ name, image, content })
    endpointResponse({
      res,
      code: 201,
      status: true,
      message: 'Activity created',
      body: newActivity,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [create Activity - POST]: ${error.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  ShowAll,
  post,
}
