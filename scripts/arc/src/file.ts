import fs from 'node:fs/promises'
import path from 'node:path'

export async function writeFile(filepath: string, content: string) {
  const dirPath = path.dirname(filepath)
  if (!(await fs.exists(dirPath))) {
    await fs.mkdir(dirPath, { recursive: true })
  }

  const bytes = await Bun.write(filepath, content)

  return {
    filepath: filepath,
    size: bytes,
  }
}

export async function readFile(filepath: string) {
  const file = Bun.file(filepath)
  const content = await file.text()
  return {
    file: content,
    filepath: filepath,
  }
}
