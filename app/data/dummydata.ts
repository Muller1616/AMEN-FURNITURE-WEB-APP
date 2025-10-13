export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

export const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Velvet Midnight Natural Sofa",
    price: 1250.0,
    quantity: 1,
    image: "/modern-blue-velvet-sofa.jpg",
    category: "Sofa",
  },
  {
    id: "2",
    name: "Elle Decor Blue Arm Chair",
    price: 450.0,
    quantity: 2,
    image: "/blue-accent-armchair.jpg",
    category: "Chair",
  },
  {
    id: "3",
    name: "Modern Furniture Set",
    price: 850.0,
    quantity: 1,
    image: "/orange-modern-armchair.jpg",
    category: "Chair",
  },
  {
    id: "4",
    name: "Luxury Gold Accent Table",
    price: 320.0,
    quantity: 1,
    image: "/gold-round-coffee-table.jpg",
    category: "Table",
  },
]
