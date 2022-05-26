const express = require('express')

const router = new express.Router()

const { list } = require('../controllers/organization')

router.get('/public', list)

module.exports = router
