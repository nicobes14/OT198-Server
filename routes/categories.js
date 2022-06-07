const router = require('express').Router()
const { auth } = require('../middlewares/auth')
const { isAdmin } = require('../middlewares/isAdmin')
const categorySchema = require('../schemas/category')
const { validateSchema } = require('../middlewares/validateErrors')

const {
  list, listCategory, update, post, destroy,
} = require('../controllers/categories')

// get a category by id
router.get('/:id', listCategory)

// get all categories
router.get('/', list)

// create a new category
router.post('/', auth, isAdmin, validateSchema(categorySchema), post)

// delete category
router.delete('/:id', auth, isAdmin, destroy)

// edit category
router.put('/:id', auth, isAdmin, validateSchema(categorySchema), update)

module.exports = router
