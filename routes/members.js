const express = require('express')

const router = new express.Router()
const { post, update } = require('../controllers/members')
const memberSchema = require('../schemas/member')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { uploadImage } = require('../middlewares/uploadImage')

router.post('/', auth, uploadImage('image'), validateSchema(memberSchema), post)
router.put('/:id', auth, validateSchema(memberSchema), update)

module.exports = router
