const httpStatus = require('../helpers/httpStatus')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')
const { listMembers, createMember, deleteMember } = require('../services/members')

module.exports = {
  list: catchAsync(async (req, res) => {
    const members = await listMembers()
    endpointResponse({
      res,
      code: httpStatus.OK,
      status: true,
      message: 'Members successfully retrieved',
      body: members,
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
}
