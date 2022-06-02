const router = require('express').Router()
const { createTestimonialSchema } = require('../schemas/testimonial')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { post } = require('../controllers/testimonial')

router.post('/', auth, isAdmin, validateSchema(createTestimonialSchema), post)

module.exports = router
