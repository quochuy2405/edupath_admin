export type StockType = {
  quantity: number
  category: string
  imageName: string
  imageURL?: string
  id?: string
}

export type StockCreateType = { id: string; code: string; name: string; caterory: string }
export type CategoriesType = {
  id: string
  name: string
  code: string
}
