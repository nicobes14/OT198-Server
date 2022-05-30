const express = require('express')

const router = new express.Router()

const { list, listById } = require('../controllers/slide')

router.get('/', list)

router.get('/:id', listById)

module.exports = router
