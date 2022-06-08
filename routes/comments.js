const router = require('express').Router()
const { list, post } = require('../controllers/comments')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateSchema } = require('../middlewares/validateErrors')
const commentSchema = require('../schemas/comment')

router.get('/', auth, isAdmin, list)
router.post('/', auth, validateSchema(commentSchema), post)

module.exports = router
