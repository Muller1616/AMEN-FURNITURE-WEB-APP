"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AdminVerification from "./admin-verification"
import UserAuthForm from "./user-auth-form"
import { User, Shield } from "lucide-react"

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
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
            Welcome to <span className="text-amber-400">AMEN</span> Furniture
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-light tracking-wide drop-shadow-lg">
            Discover premium furniture for your dream space
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* User Card */}
          <Card className="border-2 border-white/20 bg-white/95 backdrop-blur-md hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/20 transition-all duration-500 cursor-pointer group hover:scale-105">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Customer</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Browse and shop our exclusive furniture collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300" 
                size="lg" 
                onClick={() => setSelectedRole("user")}
              >
                Continue as Customer
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="border-2 border-white/20 bg-white/95 backdrop-blur-md hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 cursor-pointer group hover:scale-105">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Administrator</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Access admin dashboard and manage the store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
                onClick={() => setSelectedRole("admin")}
              >
                Continue as Admin
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}