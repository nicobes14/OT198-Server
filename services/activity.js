const { Activity } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  listActivity: async () => {
    try {
      const activities = await Activity.findAll()
      return activities
    } catch (error) {
      throw new Error(error)
    }
  },
  postActivity: async (activity) => {
    try {
      const newActivity = await Activity.create(activity)
      return newActivity
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, error.message)
    }
  },
  updateActivity: async (activity, id) => {
    try {
      const editActivity = await Activity.update(activity, {
        where: { id },
      })
      if (editActivity[0] !== 1) throw new Error(`Activity ${id} not found`)
      const activityUpdated = await Activity.findByPk(id)
      return activityUpdated
    } catch (error) {
      throw new ApiError(httpStatus.NOT_FOUND, error.message)
    }
  },
}
