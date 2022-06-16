const router = require('express').Router()
const {
  list, update, post, destroy,
} = require('../controllers/comments')
const { auth } = require('../middlewares/auth')
const ownership = require('../middlewares/ownership')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateSchema } = require('../middlewares/validateErrors')
const { updateCommentSchema, newCommentSchema } = require('../schemas/comment')

router.get('/', auth, isAdmin, list)
router.post('/', auth, validateSchema(newCommentSchema), post)
router.put('/:id', auth, ownership('Comment'), validateSchema(updateCommentSchema), update)
router.delete('/:id', auth, ownership('Comment'), destroy)

module.exports = router
