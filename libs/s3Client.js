const { S3Client } = require('@aws-sdk/client-s3')

// Set the AWS Region.
const REGION = process.env.AWS_REGION
const SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID

const s3Client = new S3Client({
  secretAccessKey: SECRET_KEY,
  accessKeyId: ACCESS_KEY,
  region: REGION,
})
module.exports = { s3Client }
