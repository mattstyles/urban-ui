export interface PageInfo {
  name: string
  category: string
  description?: string
  filePath: string
  sections: Section[]
}

export interface Section {
  name: string
  startLine: number
  endLine: number
}

export interface PageRegistry {
  [name: string]: Omit<PageInfo, 'sections'>
}
