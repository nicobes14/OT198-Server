const express = require('express')

const router = new express.Router()

const { list } = require('../controllers/slide')

router.get('/', list)

module.exports = router
