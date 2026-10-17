export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  thumbnail: string
  images?: string[]
  reviews?: { reviewerName: string; comment: string; rating: number }[]
  shippingInformation?: string
  warrantyInformation?: string
  returnPolicy?: string
}

export type CartLine = { product: Product; quantity: number }
