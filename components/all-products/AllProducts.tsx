import Link from "next/link"
import ProductCard from "@/components/product-card/ProductCard"
import { allProducts } from "@/lib/dummy-data"

export default function AllProducts() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 animate-fade-in-up">All Product</h2>
          <Link
            href="/products"
            className="text-[#4a6fa5] hover:text-[#3d5a85] font-semibold transition-colors duration-300 hover:underline text-sm sm:text-base"
          >
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {allProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
