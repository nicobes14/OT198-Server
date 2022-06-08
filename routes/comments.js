const router = require('express').Router()
const { list, post } = require('../controllers/comments')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')

router.get('/', auth, isAdmin, list)
router.post('/', auth, post)

module.exports = router
