"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminVerification from "./admin-verification"
import UserAuthForm from "./user-auth-form"
import { User, Shield, Sparkles } from "lucide-react"

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<"user" | "admin" | null>(null)

  if (selectedRole === "admin") {
    return <AdminVerification onBack={() => setSelectedRole(null)} />
  }

  if (selectedRole === "user") {
    return <UserAuthForm onBack={() => setSelectedRole(null)} />
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Amazing Dramatic Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2532&auto=format&fit=crop"
          alt="Luxury Modern Furniture Showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl animate-fade-in">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/30 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-amber-300 font-semibold text-sm tracking-wide">PREMIUM FURNITURE COLLECTION</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight drop-shadow-2xl leading-tight">
            Transform Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 animate-gradient">
              Living Space
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-100 font-light tracking-wide drop-shadow-lg mb-6 max-w-3xl mx-auto">
            Discover handcrafted furniture that blends elegance, comfort, and timeless design
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/90 text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span>Handcrafted Design</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
              <span>Worldwide Shipping</span>
            </div>
          </div>
        </div>

        {/* Role Selection - Smaller Cards */}
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
            {/* User Card - Compact */}
            <Card className="border-2 border-white/30 bg-white/90 backdrop-blur-lg hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/30 transition-all duration-500 cursor-pointer group hover:scale-105">
              <CardHeader className="text-center pb-4 pt-6">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Customer</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Shop our exclusive collection
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Button 
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300" 
                  onClick={() => setSelectedRole("user")}
                >
                  Continue as Customer
                </Button>
              </CardContent>
            </Card>

            {/* Admin Card - Compact */}
            <Card className="border-2 border-white/30 bg-white/90 backdrop-blur-lg hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 cursor-pointer group hover:scale-105">
              <CardHeader className="text-center pb-4 pt-6">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Administrator</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Manage your store
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-6">
                <Button
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedRole("admin")}
                >
                  Continue as Admin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-white/80 text-sm">
            Join thousands of satisfied customers worldwide
          </p>
        </div>
      </div>
    </div>
  )
}