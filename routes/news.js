const express = require('express')

const router = new express.Router()

const { validateSchema } = require('../middlewares/validateErrors')
const { newSchema } = require('../schemas/new')
const {
  post, listNew, update, destroy, list,
} = require('../controllers/news')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { listNewsComments } = require('../controllers/comments')
const { uploadImage } = require('../middlewares/uploadImage')

router.get('/', list)
router.get('/:id', listNew)
router.post('/', auth, isAdmin, uploadImage('image'), validateSchema(newSchema), post)
router.put('/:id', auth, isAdmin, uploadImage('image'), validateSchema(newSchema), update)
router.delete('/:id', auth, isAdmin, destroy)

// get news comments
router.get('/:id/comments', auth, listNewsComments)

module.exports = router
