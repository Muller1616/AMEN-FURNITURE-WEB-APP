"use client"

import { useState, use } from "react"
import { ChevronLeft, Star, ShoppingCart, Heart, Share2, Check, Minus, Plus } from "lucide-react"
import Link from "next/link"
import { popularProducts, latestProducts, allProducts } from "@/lib/dummy-data"

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const productId = resolvedParams.id

  // Find product from all product arrays
  const allProductsList = [...popularProducts, ...latestProducts, ...allProducts]
  const product = allProductsList.find((p) => p.id === productId)

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [isAdding, setIsAdding] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-[#4a6fa5] hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const images = product.additionalImages || [product.image]

  const handleAddToCart = () => {
    setIsAdding(true)
    setTimeout(() => {
      setIsAdding(false)
      console.log("[v0] Added to cart:", product.name, "Quantity:", quantity)
    }, 1000)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-[#4a6fa5] transition-colors duration-300"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-semibold">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index ? "border-[#4a6fa5] shadow-md" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 text-balance">{product.name}</h1>
              <div className="flex items-center space-x-4">
                {product.rating && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating!)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">{product.rating} / 5.0</span>
                  </div>
                )}
                {product.quality && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.quality} Quality
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-gray-900">৳{product.price.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-xl">৳{(product.price * 1.3).toFixed(2)}</span>
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">23% OFF</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.detailedDescription || product.description}</p>
            </div>

            {/* Material & Dimensions */}
            {(product.material || product.dimensions) && (
              <div className="bg-gray-100 rounded-xl p-5 space-y-3">
                {product.material && (
                  <div>
                    <span className="font-semibold text-gray-900">Material: </span>
                    <span className="text-gray-700">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="font-semibold text-gray-900">Dimensions: </span>
                    <span className="text-gray-700">
                      {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth}
                    </span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="font-semibold text-gray-900">Weight: </span>
                    <span className="text-gray-700">{product.weight}</span>
                  </div>
                )}
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
                        selectedColor === index
                          ? "border-[#4a6fa5] bg-[#4a6fa5] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors duration-300"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-3 font-bold text-lg">{quantity}</span>
                  <button onClick={incrementQuantity} className="p-3 hover:bg-gray-100 transition-colors duration-300">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-600">
                  {product.inStock ? (
                    <span className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className="flex-1 bg-[#4a6fa5] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#3d5a85] transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-6 h-6" />
                <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isFavorite
                    ? "border-red-500 bg-red-50 text-red-500"
                    : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500" : ""}`} />
              </button>
              <button className="p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-600 hover:border-gray-400 transition-all duration-300">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
