"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingCart, Menu, X } from "lucide-react"
import SearchModal from "./SearchModal"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const [cartCount] = useState<number>(3)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#3d4f63]/95 backdrop-blur-sm shadow-lg animate-fade-in">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 animate-slide-in-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-8 sm:h-8"
                >
                  <rect x="4" y="4" width="8" height="8" fill="white" opacity="0.9" />
                  <rect x="20" y="4" width="8" height="8" fill="white" opacity="0.7" />
                  <rect x="4" y="20" width="8" height="8" fill="white" opacity="0.7" />
                  <rect x="20" y="20" width="8" height="8" fill="white" opacity="0.9" />
                  <rect x="12" y="12" width="8" height="8" fill="white" opacity="0.5" />
                </svg>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 animate-fade-in stagger-2">
              <Link
                href="/"
                className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 text-sm lg:text-base"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 text-sm lg:text-base"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 text-sm lg:text-base"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-white/90 hover:text-white font-medium transition-all duration-300 hover:scale-105 text-sm lg:text-base"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3 sm:space-x-6 animate-slide-in-right">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center space-x-2 text-white/90 hover:text-white transition-all duration-300 hover:scale-105"
              >
                <Search className="w-5 h-5" />
                <span className="text-sm font-medium">Search</span>
              </button>
              <Link
                href="/profile"
                className="text-white/90 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <User className="w-5 h-5" />
              </Link>
              <Link
                href="/cart"
                className="relative text-white/90 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in-up border-t border-white/10">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-white/90 hover:text-white font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-white/90 hover:text-white font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/about"
                  className="text-white/90 hover:text-white font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-white/90 hover:text-white font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <button
                  onClick={() => {
                    setSearchOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
                >
                  <Search className="w-5 h-5" />
                  <span className="text-sm font-medium">Search</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
