const express = require('express')

const router = express.Router()

const { post } = require('../controllers/activity')
const { validateSchema } = require('../middlewares/validateErrors')
const activitySchema = require('../schemas/activity')

router.post('/', validateSchema(activitySchema), post)

module.exports = router
