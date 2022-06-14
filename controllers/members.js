const httpStatus = require('../helpers/httpStatus')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const {
  listMembers, createMember, deleteMember, updateMember,
} = require('../services/members')
const { calculatePagination } = require('../utils/pagination')

module.exports = {
  list: catchAsync(async (req, res) => {
    const resource = req.baseUrl
    req.query.page = req.query.page || 1
    const members = await listMembers(req.query.page)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Members successfully retrieved',
      body: {
        ...calculatePagination(req.query.page, members.count, resource),
        members: members.rows,
      },
    })
  }),
  post: catchAsync(async (req, res) => {
    const member = await createMember(req)
    endpointResponse({
      res,
      code: httpStatus.CREATED,
      status: true,
      message: 'Member created successfully',
      body: member,
    })
  }),
  destroy: catchAsync(async (req, res) => {
    const { id } = req.params
    const status = await deleteMember(id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status,
      message: 'Member deleted',
    })
  }),
  update: catchAsync(async (req, res) => {
    const { id } = req.params
    const memberUpdated = await updateMember(req, id)
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Member updated',
      body: memberUpdated,
    })
  }),
}
