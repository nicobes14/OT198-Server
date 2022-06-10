const { Comment } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')
const { decodeToken } = require('../middlewares/jwt')

module.exports = {
  listComments: async () => {
    try {
      const comments = await Comment.findAll({
        attributes: ['body'],
        order: [['createdAt', 'DESC']],
      })
      return comments
    } catch (error) {
      throw new ApiError(httpStatus.NOT_FOUND, error.parent.code)
    }
  },
  deleteComment: async (id, req) => {
    const comment = await Comment.findByPk(id)
    if (!comment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
    }
    const user = decodeToken(req)
    if (user.roleId === 1 || user.id === comment.userId) {
      await comment.destroy()
      return true
    }
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not allowed to do this')
  },
}
