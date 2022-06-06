const express = require('express')

const router = express.Router()

const { post, update } = require('../controllers/activity')
const { validateSchema } = require('../middlewares/validateErrors')
const { isAdmin } = require('../middlewares/isAdmin')
const { auth } = require('../middlewares/auth')
const activitySchema = require('../schemas/activity')

router.post('/', validateSchema(activitySchema), post)
router.put('/:id', auth, isAdmin, validateSchema(activitySchema), update)

module.exports = router
