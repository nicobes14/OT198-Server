const createHttpError = require('http-errors')
const { endpointResponse } = require('../helpers/success')
const {
  listCategories,
  listCategoryById,
  createCategory,
  deleteCategory,
} = require('../services/categories')

const list = async (req, res, next) => {
  try {
    const categories = await listCategories()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Categories found',
      body: categories,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error retrieving categories] - [categories - GET]: ${error.message}`,
    )
    next(httpError)
  }
}

const listCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const category = await listCategoryById(id)
    if (!category) throw next(createHttpError(404, `Category with id ${id} not found`))
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Category found',
      body: category,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [listCategory with ID - GET]: ${error.message}`,
    )
    next(httpError)
  }
}

const post = async (req, res, next) => {
  try {
    const { name, description, image } = req.body
    const category = await createCategory({ name, description, image })
    endpointResponse({
      res,
      code: 201,
      status: true,
      message: 'Category created',
      body: category,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [create Category - POST]: ${error.message}`,
    )
    next(httpError)
  }
}

const destroy = async (req, res, next) => {
  const { id } = req.params
  try {
    const { code, status, message } = await deleteCategory(id)
    endpointResponse({
      res,
      code,
      status,
      message,
    })
  } catch (error) {
    const httpError = createHttpError(
      error.statusCode,
      `[Error with database] - [delete Category - DELETE]: ${error.message}`,
    )
    next(httpError)
  }
}

module.exports = {
  list,
  listCategory,
  post,
  destroy,
}
