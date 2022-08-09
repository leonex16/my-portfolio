import 'dotenv/config'
import S3 from 'aws-sdk/clients/s3'

const s3Client = new S3({ region: process.env.AWS_REGION })

export { s3Client }
