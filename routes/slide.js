const express = require('express')

const router = new express.Router()

const {
  list, listById, update, destroy,
} = require('../controllers/slide')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateSchema } = require('../middlewares/validateErrors')
const { updateSlideSchema } = require('../schemas/slide')
const { uploadImage } = require('../middlewares/uploadImage')

router.get('/', list)

router.get('/:id', listById)

router.put(
  '/:id',
  auth,
  isAdmin,
  uploadImage('imageURL'),
  validateSchema(updateSlideSchema),
  update,
)

router.delete(
  '/:id',
  auth,
  isAdmin,
  destroy,
)

module.exports = router
