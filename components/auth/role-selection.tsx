"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import UserAuthForm from "./user-auth-form"
import { User, Shield, Sparkles, ArrowRight } from "lucide-react"

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<"user" | "admin" | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle admin redirect - FIXED
  const handleAdminClick = () => {
    window.location.href = "https://amen-k4ut.onrender.com/admin/"
  }

  if (selectedRole === "user") {
    return <UserAuthForm onClose={() => setSelectedRole(null)} />
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Amazing Dramatic Background Image */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2532&auto=format&fit=crop"
          alt="Luxury Modern Furniture Showroom"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Brand Logo - Top Left */}
      <div className={`fixed top-6 left-6 z-50 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-3 shadow-2xl hover:bg-white/20 transition-all duration-300">
          <Sparkles className="w-7 h-7 text-amber-400 animate-pulse" />
          <span className="text-white font-black text-2xl tracking-tight">AMEN FURNITURE</span>
        </div>
      </div>

      {/* Floating Role Selection Buttons - Top Right */}
      <div className={`fixed top-6 right-6 z-50 flex gap-3 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
        {/* User Button */}
        <Button
          onClick={() => setSelectedRole("user")}
          className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-110 border-2 border-white/30"
        >
          <span className="relative z-10 flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Customer</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>

        {/* Admin Button */}
        <Button
          onClick={handleAdminClick}
          className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 border-2 border-white/30"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="hidden sm:inline">Admin</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-6xl transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Hero Section */}
          <div className="text-center">
            <div 
              className={`inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 rounded-full px-6 py-2 mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
            >
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <span className="text-amber-300 font-semibold text-sm tracking-wide">PREMIUM FURNITURE COLLECTION</span>
            </div>
            
            <h1 
              className={`text-6xl md:text-8xl font-black text-white mb-8 tracking-tight drop-shadow-2xl leading-tight transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Transform Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-[length:200%_auto] animate-gradient">
                Living Space
              </span>
            </h1>
            
            <p 
              className={`text-2xl md:text-3xl text-gray-100 font-light tracking-wide drop-shadow-lg mb-6 max-w-3xl mx-auto transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              Discover handcrafted furniture that blends elegance, comfort, and timeless design
            </p>
            
            <div 
              className={`flex flex-wrap justify-center gap-6 text-white/90 text-base mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="flex items-center gap-2 animate-fade-in">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 animate-fade-in animation-delay-200">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span>Handcrafted Design</span>
              </div>
              <div className="flex items-center gap-2 animate-fade-in animation-delay-400">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span>Worldwide Shipping</span>
              </div>
            </div>

            {/* Call to Action */}
            <div 
              className={`transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <Button
                onClick={() => setSelectedRole("user")}
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-lg px-12 py-6 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Shopping
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>

            {/* Bottom Text */}
            <div 
              className={`mt-12 transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <p className="text-white/80 text-sm">
                Join thousands of satisfied customers worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}