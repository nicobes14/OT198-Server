const router = require('express').Router()
const userSchema = require('../schemas/user')
const { validateSchema } = require('../middlewares/validateErrors')
const { post } = require('../controllers/user')

// register new user
router.post('/register', validateSchema(userSchema), post)

module.exports = router
