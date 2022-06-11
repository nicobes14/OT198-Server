const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')
const {
  listComments,
  listNewsCommentsService,
  updateComment,
  createComments,
} = require('../services/comments')

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
  post: catchAsync(async (req, res) => {
    const { body } = req
    const comment = await createComments(body)
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Comment created',
      body: comment,
    })
  }),
  update: catchAsync(async (req, res) => {
    const updatedComment = await updateComment(req)
    endpointResponse({
      res,
      code: 200,
      status: true,
      message: 'Comment updated',
      body: updatedComment,
    })
  }),
}
