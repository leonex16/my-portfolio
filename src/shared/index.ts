import fs from 'node:fs'
import mime from 'mime-types'

interface DirectoryOrFile {
  relativePath: string,
  contentType: string,
  data: Uint8Array | DirectoryOrFile[],
  isDirectory: boolean
}

type File = Omit<DirectoryOrFile, 'isDirectory'>

export const waitFor = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms))

export class DirectoryFiles {
  static async dirPath (path: string) {
    const directoryFiles = await this.readDirAsync(path)
    const files = directoryFiles.map(this.extractFiles).flat(50)
    return files as File[]
  }

  private static readDirAsync = async (dirPath: string) => {
    const dirents = fs.readdirSync(dirPath, { withFileTypes: true })
    const files: DirectoryOrFile[] = []

    for (const dirent of dirents) {
      const relativePath = `${dirPath}/${dirent.name}`
      const contentType = mime.lookup(relativePath)
      const isDirectory = dirent.isDirectory()
      const tempFiles = dirent.isDirectory()
        ? await Promise.all(await this.readDirAsync(relativePath))
        : await new Promise<Uint8Array>(resolve => resolve(fs.readFileSync(relativePath))).catch()

      files.push({ relativePath, contentType, isDirectory, data: tempFiles })
    }
    return files
  }

  private static extractFiles = ({ relativePath, contentType: extensionFile, data, isDirectory }: DirectoryOrFile): File | File[] => {
    const directory = (data as unknown as DirectoryOrFile[])

    return isDirectory === false
      ? { relativePath, contentType: extensionFile, data }
      : directory.map(this.extractFiles) as File[]
  }
}
