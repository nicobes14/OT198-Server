const express = require('express')

const router = new express.Router()
const {
  list, post, destroy, update,
} = require('../controllers/members')
const { memberSchema, updateMemberSchema } = require('../schemas/member')
const { validateSchema } = require('../middlewares/validateErrors')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { uploadImage } = require('../middlewares/uploadImage')

router.get('/', auth, isAdmin, list)

router.post('/', auth, uploadImage('image'), validateSchema(memberSchema), post)
router.put('/:id', auth, uploadImage('image'), validateSchema(updateMemberSchema), update)

router.delete('/:id', auth, destroy)

module.exports = router
