const multer = require('multer')
const fs = require('fs')

const path = require('path')
const { catchAsync } = require('../helpers/catchAsync')
const ApiError = require('../helpers/ApiError')

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }
    return cb(undefined, true)
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true })
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      const name = req.body.name || req.body.email
      cb(null, `${name || 'slide'}-${Date.now()}${path.extname(file.originalname)}`)
    },
  }),
})

module.exports = {
  /**
   * Middleware to upload image to temporary folder
   *
   * @param {string} image the name of the key in the req.body
   * @return {void} if no error occurs the image is saved in the temporary folder
   * and the path is saved in req.body.${image} else an error is thrown
   */
  uploadImage: (image) => catchAsync(async (req, res, next) => {
    upload.single(image)(req, res, async (err) => {
      if (err) {
        return next(new ApiError(400, err.message))
      }
      if (!req.file) {
        return next()
      }

      // eslint-disable-next-line no-eval
      eval(`req.body.${image} = '${req.file.path}'`)

      return next()
    })
  }),
}
