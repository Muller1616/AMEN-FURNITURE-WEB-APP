"use client"

import Link from "next/link"
import { Armchair, Sofa, Table2, Bed, Lamp } from "lucide-react"
import type { Category } from "@/types"

interface CategoryCardProps {
  category: Category
  index: number
}

const iconMap = {
  chair: Armchair,
  sofa: Sofa,
  table: Table2,
  bed: Bed,
  lamp: Lamp,
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const Icon = iconMap[category.icon as keyof typeof iconMap] || Armchair

  return (
    <Link
      href={`/products/${category.slug}`}
      className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scale-in flex flex-col items-center text-center space-y-3 sm:space-y-4"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#4a6fa5]/10 rounded-full flex items-center justify-center group-hover:bg-[#4a6fa5] transition-all duration-300">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#4a6fa5] group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-[#4a6fa5] transition-colors duration-300">
          {category.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1">{category.itemCount} Item Available</p>
      </div>
    </Link>
  )
}
