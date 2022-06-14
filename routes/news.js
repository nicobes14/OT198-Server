const express = require('express')

const router = new express.Router()

const { validateSchema } = require('../middlewares/validateErrors')
const newSchema = require('../schemas/new')
const {
  post, list, update, destroy,
} = require('../controllers/news')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { listNewsComments } = require('../controllers/comments')

router.get('/:id', list)
router.post('/', auth, isAdmin, validateSchema(newSchema), post)
router.put('/:id', auth, isAdmin, validateSchema(newSchema), update)
router.delete('/:id', auth, isAdmin, destroy)

// get news comments
router.get('/:id/comments', auth, listNewsComments)

module.exports = router
