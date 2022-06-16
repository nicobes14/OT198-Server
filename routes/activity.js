const express = require('express')

const router = express.Router()

const { post, update } = require('../controllers/activity')
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const { validateSchema } = require('../middlewares/validateErrors')
const { activitySchema } = require('../schemas/activity')

router.post('/', auth, isAdmin, validateSchema(activitySchema), post)
router.put('/:id', auth, isAdmin, validateSchema(activitySchema), update)

module.exports = router
