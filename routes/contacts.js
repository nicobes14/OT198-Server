const router = require('express').Router()
const { list } = require('../controllers/contacts')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

router.get('/', auth, isAdmin, list)

module.exports = router
