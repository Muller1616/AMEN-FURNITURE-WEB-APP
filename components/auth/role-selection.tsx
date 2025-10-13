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
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop"
          alt="Modern Luxury Furniture Showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to AMEN Furniture</h1>
          <p className="text-lg md:text-xl text-gray-200">Discover premium furniture for your dream space</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* User Card */}
          <Card className="border-2 hover:border-primary transition-all cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <User className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Customer</CardTitle>
              <CardDescription>Browse and shop our exclusive furniture collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" onClick={() => setSelectedRole("user")}>
                Continue as Customer
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="border-2 hover:border-primary transition-all cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Administrator</CardTitle>
              <CardDescription>Access admin dashboard and manage the store</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-transparent"
                size="lg"
                variant="outline"
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