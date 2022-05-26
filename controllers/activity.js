const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const db = require('../database/models')

const { Activity } = db

// find all activities

const ShowAll = async (req, res, next) => {
  try {
    const activities = await Activity.findAll()
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

module.exports = {
  ShowAll,
}
