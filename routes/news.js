const express = require('express')

const router = new express.Router()

const { validateSchema } = require('../middlewares/validateErrors')
const newSchema = require('../schemas/newSchema')
const { post, listNews, update } = require('../controllers/news')

router.get('/:id', listNews)
router.post('/', validateSchema(newSchema), post)
router.put('/:id', validateSchema(newSchema), update)

module.exports = router
