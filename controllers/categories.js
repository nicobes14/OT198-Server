const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { calculatePagination } = require('../utils/pagination')
const {
  listCategories,
  listCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
} = require('../services/categories')
const httpStatus = require('../helpers/httpStatus')

module.exports = {
  list: catchAsync(async (req, res) => {
    const resource = req.baseUrl
    req.query.page = req.query.page || 1
    const categories = await listCategories(req.query.page)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Categories successfully retrieved',
      body: {
        ...calculatePagination(req.query.page, categories.count, resource),
        categories: categories.rows,
      },
    })
  }),
  listCategory: catchAsync(async (req, res) => {
    const { id } = req.params
    const response = await listCategoryById(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Categories found',
      body: response,
    })
  }),
  update: catchAsync(async (req, res) => {
    const updatedCategory = await updateCategory(req.params.id, req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      message: 'Category updated',
      body: updatedCategory,
    })
  }),
  post: catchAsync(async (req, res) => {
    const category = await createCategory(req)
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'Category created',
      body: category,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteCategory(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Category deleted',
    })
  }),
}
