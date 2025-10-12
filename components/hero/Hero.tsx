"use client"

import Link from "next/link"

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: "url('/homesofa.png?height=900&width=1600')", // replace with your real image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered Text Content */}
      <div className="relative z-10 max-w-3xl px-4 space-y-6 animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
          Elevate Your Home Decor with Our Premium Furniture Collection
        </h1>
        <p className="text-lg sm:text-xl text-white/80">
          Discover handcrafted furniture pieces that blend style, comfort, and quality to transform your living spaces.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-[#3d4f63] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          Contact Us
        </Link>
      </div>
    </section>
  )
}
