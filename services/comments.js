const { Comment, User, New } = require('../database/models')
const ApiError = require('../helpers/ApiError')
const httpStatus = require('../helpers/httpStatus')
const { decodeToken } = require('../middlewares/jwt')

module.exports = {
  listComments: async () => {
    const comments = await Comment.findAll({
      attributes: ['body'],
      order: [['createdAt', 'DESC']],
    })
    return comments
  },
  /**
   * @param {number} id the id of the new
   * @returns {Promise<Comment[]>} the comments of the new
   * @throws {ApiError} if the new does not exist
   * @description Get comments of a news
   * @example
   * GET localhost:3000/news/:id/comments
   * {
   *  "comments": [
   *   {
   *    "id": 1,
   *    "UserId": 1,
   *    "body": "This is a comment",
   *    "NewId": 1,
   *    "createdAt": "2020-05-05T15:00:00.000Z",
   *    "updatedAt": "2020-05-05T15:00:00.000Z",
   *    "User": {
   *        "firstName": "John",
   *        "lastName": "Doe",
   *     },
   * {
   *    "id": 2,
   *    "UserId": 1,
   *    "body": "This is a comment 2",
   *    "NewId": 1
   *    "createdAt": "2020-05-05T15:00:00.000Z",
   *    "updatedAt": "2020-05-05T15:00:00.000Z",
   *    "User": {
   *        "firstName": "Yoda",
   *        "lastName": "Doe",
   *    }
   * ]
   * }
   * */
  listNewsCommentsService: async (id) => {
    // check if new with id exists
    if (!(await New.findByPk(id))) {
      throw new ApiError(httpStatus.NOT_FOUND, `There is no news with id ${id}`)
    }

    // get comments of new with id
    const comments = await Comment.findAll({
      where: {
        newId: id,
      },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
      ],
    })
    return { comments }
  },
  createComments: async (body) => {
    if (!(await User.findByPk(body.userId)) || !(await New.findByPk(body.newId))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'User or New not found')
    }
    const comment = await Comment.create(body)
    return comment
  },

  updateComment: async (req) => {
    const comment = await Comment.findByPk(req.params.id)
    const user = decodeToken(req)
    if (!comment) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
    }
    if (user.roleId !== 1 && user.id !== comment.userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }
    comment.body = req.body.body
    await comment.save()
    return comment
  },
}
