const router = require('express').Router()
const { destroy } = require('../controllers/user')

// delete user
router.delete('/:id', destroy)

module.exports = router
