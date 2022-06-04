const router = require('express').Router()
const { list, post } = require('../controllers/contacts')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateSchema } = require('../middlewares/validateErrors')
const contactSchema = require('../schemas/contact')

router.get('/', auth, isAdmin, list)

router.post('/', auth, validateSchema(contactSchema), post)

module.exports = router
