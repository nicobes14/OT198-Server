const router = require('express').Router()
const {
  list, update, post, destroy,
} = require('../controllers/comments')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateSchema } = require('../middlewares/validateErrors')
const { updateCommentSchema, newCommentSchema } = require('../schemas/comment')

router.get('/', auth, isAdmin, list)
router.post('/', auth, validateSchema(newCommentSchema), post)

router.put('/:id', auth, validateSchema(updateCommentSchema), update)
// delete comments
router.delete('/:id', auth, destroy)

module.exports = router
