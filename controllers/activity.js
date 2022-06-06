const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const httpStatus = require('../helpers/httpStatus')
const { listActivity, postActivity, updateActivity } = require('../services/activity')

module.exports = {
  list: async (req, res, next) => {
    try {
      const response = await listActivity()
      endpointResponse({
        res,
        ...response,
      })
    } catch (err) {
      const httpError = createHttpError(
        err.statusCode,
        `Error showing all activities: ${err.message}`,
      )
      next(httpError)
    }
  },
  post: catchAsync(async (req, res) => {
    const { name, image, content } = req.body
    const newActivity = await postActivity({ name, image, content })
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'Activity created',
      body: newActivity,
    })
  }),
  update: catchAsync(async (req, res) => {
    const { id } = req.params
    const { name, image, content } = req.body
    const activityUpdated = await updateActivity({ name, image, content }, id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Activity updated',
      body: activityUpdated,
    })
  }),
}
