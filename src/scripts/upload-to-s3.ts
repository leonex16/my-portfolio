import type { PutObjectRequest } from 'aws-sdk/clients/s3'
import { s3Client } from '../config/aws/s3'
import { DirectoryFiles } from '../shared'

const dirPath = process.argv.at(2)

if (dirPath === undefined) {
  throw new Error('Missing directory relative path')
}

(async () => {
  const files = await DirectoryFiles.dirPath(dirPath)

  console.log(`Processing ${files.length} files...`)
  for (const file of files) {
    const Key = file.relativePath.replace('dist/', '')
    const params: PutObjectRequest = { Key, Bucket: 'github-my-portfolio', Body: file.data, ContentType: file.contentType }
    s3Client.upload(params, (err) => err && console.error(err))
  }
  console.info('Completed')
})()
