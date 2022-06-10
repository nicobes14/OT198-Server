const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const { listComments, deleteComment } = require('../services/comments')

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
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    await deleteComment(id, req)
    return endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Comment deleted',
    })
  }),
}
