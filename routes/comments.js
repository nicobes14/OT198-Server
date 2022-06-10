const router = require('express').Router()
const { list, destroy } = require('../controllers/comments')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
// const { ownershipValidate } = require('../middlewares/ownership')

router.get('/', auth, isAdmin, list)
// delete comments
router.delete('/:id', auth, destroy)

module.exports = router
