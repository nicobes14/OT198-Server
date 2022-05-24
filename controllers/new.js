const { New } = require('../database/models')

const getNews = async (req, res, next) => {
  try {
    const allNews = await New.findAll()
    res.send(allNews)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getNews,
}
