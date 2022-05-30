const express = require('express')
const { get } = require('../controllers/index')
const pingRouter = require('./ping')
const categoriesRouter = require('./categories')
const newsRouter = require('./news')
const organizationRouter = require('./organization')
const authRouter = require('./auth')
const newRouter = require('./news')
const activitiesRouter = require('./activity')
const slidesRouter = require('./slide')
const userRouter = require('./user')

const router = express.Router()

// example of a route with index controller get function
router.get('/', get)
router.use('/ping', pingRouter)

// categories routes
router.use('/categories', categoriesRouter)

router.use('/news', newsRouter)
// organization routes
router.use('/organization', organizationRouter)
// auth routes
router.use('/auth', authRouter)
// slides routes
router.use('/slides', slidesRouter)

// new routes
router.use('/new', newRouter)
// user routes
router.use('/users', userRouter)
// activity routes
router.use('/activities', activitiesRouter)

module.exports = router
