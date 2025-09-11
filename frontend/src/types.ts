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
