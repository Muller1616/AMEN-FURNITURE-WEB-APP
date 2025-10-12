import Link from "next/link"
import { Facebook, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#3d4f63] text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/about" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Contact</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="text-white/80">
                <span className="font-semibold">Address:</span> Adama, ASTU
              </li>
              <li className="text-white/80">
                <span className="font-semibold">Phone:</span> +251 939268336
              </li>
              <li className="text-white/80">
                <span className="font-semibold">Email:</span> amenfurniture@gmail.com
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Important Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href="/shop" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/80 hover:text-white transition-colors text-sm sm:text-base">
                  Terms & Condition
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/60 text-xs sm:text-sm">
            © {new Date().getFullYear()} AMEN Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
