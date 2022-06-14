const router = require('express').Router()
const { userRegisterSchema } = require('../schemas/user')
const { validateSchema } = require('../middlewares/validateErrors')
const { destroy, update, list } = require('../controllers/user')
const { isAdmin } = require('../middlewares/isAdmin')
const { auth } = require('../middlewares/auth')

// list all users
router.get('/', auth, isAdmin, list)

// update user
router.put('/:id', auth, isAdmin, validateSchema(userRegisterSchema), update)
// delete user
router.delete('/:id', auth, isAdmin, destroy)

module.exports = router
