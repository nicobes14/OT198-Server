const express = require('express')

const router = new express.Router()
const { listNews } = require('../controllers/news')

router.get('/:id', listNews)

module.exports = router
