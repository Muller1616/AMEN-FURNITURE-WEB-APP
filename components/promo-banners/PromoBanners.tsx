import Link from "next/link"
import { banners } from "@/lib/dummy-data"

export default function PromoBanners() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scale-in group"
              style={{
                backgroundColor: banner.backgroundColor,
                animationDelay: `${index * 0.2}s`,
                opacity: 0,
              }}
            >
              <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8 lg:p-12 items-center min-h-[300px] sm:min-h-[400px]">
                {/* Text Content */}
                <div className="space-y-4 sm:space-y-6 z-10">
                  <p className="text-xs sm:text-sm font-semibold text-green-600 uppercase tracking-wide">
                    {banner.subtitle}
                  </p>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight text-balance">
                    {banner.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 text-pretty">{banner.description}</p>
                  <Link
                    href={banner.buttonLink}
                    className="inline-block bg-[#3d4f63] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#2d3e50] transition-all duration-300 hover:shadow-lg group-hover:scale-105 text-sm sm:text-base"
                  >
                    {banner.buttonText}
                  </Link>
                </div>

                {/* Image */}
                <div className="relative h-48 sm:h-64 md:h-full">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
