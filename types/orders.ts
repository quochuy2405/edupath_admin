import { ProductType } from './product'

export type OrderType = {
  name: string
  email: string
  award: string
  province: string
  district: string
  phone: string
  addressNumber: string
  products: Array<Partial<ProductType>>
}
