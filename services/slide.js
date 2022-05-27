const db = require('../database/models')

const { Slide } = db

const listSlide = async () => {
  try {
    return await Slide.findAll({ attributes: ['imageURL', 'order'] })
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  listSlide,
}
