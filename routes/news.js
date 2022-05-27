const express = require('express')

const router = new express.Router()

const { validateSchema } = require('../middlewares/validateErrors')
const newSchema = require('../schemas/newSchema')
const { post } = require('../controllers/news')
const { listNews } = require('../controllers/news')

router.get('/:id', listNews)
router.post('/', validateSchema(newSchema), post)

module.exports = router
