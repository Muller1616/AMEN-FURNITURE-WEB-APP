export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
  inStock?: boolean
  rating?: number
  detailedDescription?: string
  quality?: string
  material?: string
  dimensions?: {
    width: string
    height: string
    depth: string
  }
  weight?: string
  colors?: string[]
  features?: string[]
  additionalImages?: string[]
}

export interface Category {
  id: string
  name: string
  icon: string
  itemCount: number
  slug: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface Banner {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  backgroundColor: string
}
