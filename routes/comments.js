const router = require('express').Router()
const { list, update, post } = require('../controllers/comments')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateSchema } = require('../middlewares/validateErrors')
const { commentSchema, newCommentSchema } = require('../schemas/comment')

router.get('/', auth, isAdmin, list)
router.post('/', auth, validateSchema(newCommentSchema), post)

router.put('/:id', auth, validateSchema(commentSchema), update)

module.exports = router
