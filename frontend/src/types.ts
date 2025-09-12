export interface Archive {
  id: number
  title: string
  letterNo: string
  file: string
  category: {
    id: number,
    name: string
  }
  createdAt: Date
}

export interface Category {
  id: number
  name: string
  description: string
}
