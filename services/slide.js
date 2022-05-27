const db = require('../database/models')

const { Slide } = db

const listSlide = async () => {
  try {
    const slides = await Slide.findAll({ attributes: ['imageURL', 'order'] })
    return slides
  } catch (error) {
    return (error)
  }
}

module.exports = {
  listSlide,
}
