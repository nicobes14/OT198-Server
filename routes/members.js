const express = require('express')

const router = new express.Router()
const { list, post } = require('../controllers/members')
const memberSchema = require('../schemas/member')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { uploadImage } = require('../middlewares/uploadImage')

router.get('/', auth, isAdmin, list)

router.post('/', auth, uploadImage('image'), validateSchema(memberSchema), post)

module.exports = router
