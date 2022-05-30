const router = require('express').Router()
const { userRegisterSchema } = require('../schemas/user')
const { validateSchema } = require('../middlewares/validateErrors')
const { put } = require('../controllers/user')

// update user
router.put('/:id', validateSchema(userRegisterSchema), put)
module.exports = router
