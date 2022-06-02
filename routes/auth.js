const router = require('express').Router()
const { userRegisterSchema, userLoginSchema } = require('../schemas/user')
const { validateSchema } = require('../middlewares/validateErrors')
const { post, login, userDataByToken } = require('../controllers/user')
const { auth } = require('../middlewares/auth')

// register new user
router.post('/register', validateSchema(userRegisterSchema), post)

// login user
router.post('/login', validateSchema(userLoginSchema), login)

// authenticated user data
router.get('/me', auth, userDataByToken)

module.exports = router
