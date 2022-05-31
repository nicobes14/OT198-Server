const router = require('express').Router()
const { userRegisterSchema } = require('../schemas/user')
const { validateSchema } = require('../middlewares/validateErrors')
const { destroy, put, list } = require('../controllers/user')
const { isAdmin } = require('../middlewares/isAdmin')
const { auth } = require('../middlewares/auth')

// list all users
router.get('/', auth, isAdmin, list)

// update user
router.put('/:id', validateSchema(userRegisterSchema), put)
// delete user
router.delete('/:id', destroy)

module.exports = router
