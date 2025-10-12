"use client"

import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/types"
import { useState } from "react"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    // Simulate adding to cart
    setTimeout(() => {
      setIsAdding(false)
      console.log("[v0] Added to cart:", product.name)
    }, 1000)
  }

  return (
    <div
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scale-in"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gray-50 aspect-square cursor-pointer">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {product.rating && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-semibold">{product.rating}</span>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 hover:text-[#4a6fa5] transition-colors duration-300 text-balance line-clamp-2 cursor-pointer">
            {product.name}
          </h3>
        </Link>
        {product.description && <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{product.description}</p>}
        <div className="flex items-center justify-between">
          <p className="text-lg sm:text-xl font-bold text-gray-900">৳{product.price.toFixed(2)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className="w-full bg-[#4a6fa5] text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#3d5a85] transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:scale-110 transition-transform duration-300" />
          <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  )
}
