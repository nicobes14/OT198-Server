const express = require('express')

const router = new express.Router()
const { list, put } = require('../controllers/organization')
const { organizationSchema } = require('../schemas/organization')
const { validateSchema } = require('../middlewares/validateErrors')
const { isAdmin } = require('../middlewares/isAdmin')
const { auth } = require('../middlewares/auth')

router.get('/public', list)

router.post('/public', auth, isAdmin, validateSchema(organizationSchema), put)

module.exports = router
