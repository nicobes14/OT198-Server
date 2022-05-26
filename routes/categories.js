const router = require('express').Router()

const { list, listCategory } = require('../controllers/categories')

// get a category by id
router.get('/:id', listCategory)

// get all categories
router.get('/', list)

module.exports = router
