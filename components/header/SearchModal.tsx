"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { popularProducts, latestProducts, allProducts } from "@/lib/dummy-data"
import type { Product } from "@/types"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])

  // Combine all products for searching
  const allProductsList = [...popularProducts, ...latestProducts, ...allProducts]

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    // Filter products based on search query
    const results = allProductsList.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    setSearchResults(results.slice(0, 6)) // Limit to 6 results
  }, [searchQuery])

  useEffect(() => {
    // Close modal on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-slide-in-down">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for furniture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-gray-900 placeholder:text-gray-400"
            autoFocus
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {searchQuery.trim() === "" ? (
            <div className="text-center py-12 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Start typing to search for products...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No products found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 group-hover:text-[#3d4f63] transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{product.description}</p>
                    <p className="text-sm font-semibold text-[#3d4f63] mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
