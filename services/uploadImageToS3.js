const { PutObjectCommand } = require('@aws-sdk/client-s3')
const util = require('util')
const fs = require('fs')

const unlinkFile = util.promisify(fs.unlink)

const { s3Client } = require('../libs/s3Client')

const BUCKET = process.env.S3_BUCKET_NAME
const REGION = process.env.AWS_REGION

module.exports = {
  /**
   * Service to upload image to S3
   *
   * @param {request} req the request object that contains the image to upload to S3 bucket
   * @return {string} the path of the image in S3 bucket
   */
  uploadImageToS3: async (req) => {
    const fileStream = fs.createReadStream(req.file.path)
    const uploadParams = {
      Bucket: BUCKET,
      Body: fileStream,
      Key: req.file.filename,
    }
    await s3Client.send(new PutObjectCommand(uploadParams))

    const fileLocation = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${req.file.filename}`

    await unlinkFile(req.file.path)

    return fileLocation
  },
}
