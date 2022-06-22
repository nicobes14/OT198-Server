const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const httpStatus = require('../helpers/httpStatus')
const {
  getNewById, createNew, updateNew, deleteNew, listNews,
} = require('../services/news')
const { calculatePagination } = require('../utils/pagination')

module.exports = {
  list: catchAsync(async (req, res) => {
    const resource = req.baseUrl
    req.query.page = req.query.page || 1
    const news = await listNews(req.query.page)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'successfully retrieved',
      body: {
        ...calculatePagination(req.query.page, news.count, resource),
        news: news.rows,
      },
    })
  }),
  listNew: catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await getNewById(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'successfully retrieved',
      body: result,
    })
  }),
  post: catchAsync(async (req, res) => {
    const createdNew = await createNew(req)
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'New created',
      body: createdNew,
    })
  }),
  update: catchAsync(async (req, res) => {
    const updatedNew = await updateNew(req)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'New updated',
      body: updatedNew,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteNew(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'New deleted',
    })
  }),
}
