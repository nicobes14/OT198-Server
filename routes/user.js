const router = require('express').Router()
const { userRegisterSchema } = require('../schemas/user')
const { validateSchema } = require('../middlewares/validateErrors')
const { destroy, put } = require('../controllers/user')

// update user
router.put('/:id', validateSchema(userRegisterSchema), put)
// delete user
router.delete('/:id', destroy)

module.exports = router
