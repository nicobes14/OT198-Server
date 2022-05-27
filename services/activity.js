const db = require('../database/models')

const { Activity } = db

const listActivity = async () => {
  try {
    const activities = await Activity.findAll()
    return activities
  } catch (e) {
    throw new Error(e)
  }
}

const postActivity = async (activity) => {
  try {
    const newActivity = await Activity.create(activity)
    return newActivity
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = { listActivity, postActivity }
