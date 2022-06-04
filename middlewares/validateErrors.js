const { validationResult } = require('express-validator')
const util = require('util')
const fs = require('fs')
const ApiError = require('../helpers/ApiError')
const { catchAsync } = require('../helpers/catchAsync')

const unlinkFile = util.promisify(fs.unlink)

module.exports = {
  validateSchema: (schema) => catchAsync(async (req, res, next) => {
    await Promise.all(schema.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      if (req.file) await unlinkFile(req.file.path)
      throw new ApiError(400, errors.errors.map((error) => error.msg).join(', '))
    }
    return next()
  }),
}
