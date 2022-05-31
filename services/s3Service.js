const { CreateBucketCommand } = require('@aws-sdk/client-s3')
const { s3Client } = require('../libs/s3Client')

// Set the parameters
const bucketParams = {
  Bucket: process.env.S3_BUCKET_NAME,
}

module.exports = async () => {
  try {
    const data = await s3Client.send(new CreateBucketCommand(bucketParams))
    return data
  } catch (error) {
    throw new Error(error)
  }
}
