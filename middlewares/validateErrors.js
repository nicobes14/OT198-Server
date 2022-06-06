const { validationResult } = require('express-validator')
const util = require('util')
const fs = require('fs')
const httpStatus = require('../helpers/httpStatus')
const { catchAsync } = require('../helpers/catchAsync')

const unlinkFile = util.promisify(fs.unlink)

module.exports = {
  validateSchema: (schema) => catchAsync(async (req, res, next) => {
    await Promise.all(schema.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      if (req.file) await unlinkFile(req.file.path)
      return res.status(httpStatus.BAD_REQUEST).json({
        code: httpStatus.BAD_REQUEST,
        status: false,
        errors: errors.array(),
      })
    }
    return next()
  }),
}
