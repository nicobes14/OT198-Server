const router = require('express').Router()
const { userRegisterSchema, userLoginSchema } = require('../schemas/user')
const { validateSchema } = require('../middlewares/validateErrors')
const { post, login } = require('../controllers/user')

// register new user
router.post('/register', validateSchema(userRegisterSchema), post)

// login user
router.post('/login', validateSchema(userLoginSchema), login)
module.exports = router
