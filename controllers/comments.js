const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { listComments, listNewsCommentsService } = require('../services/comments')

module.exports = {
  list: catchAsync(async (req, res) => {
    const comments = await listComments()
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Comments listed',
      body: comments,
    })
  }),
  listNewsComments: catchAsync(async (req, res) => {
    const { id } = req.params
    const newsComments = await listNewsCommentsService(id)
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: `Comments of new with id ${id} listed`,
      body: newsComments,
    })
  }),
}
