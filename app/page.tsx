"use client"

import { useAuth } from "@/components/contexts/auth-context"
import RoleSelection from "@/components/auth/role-selection"
import Header from "@/components/header/Header"
// import Hero from "@/components/hero/Hero"
// import CategorySection from "@/components/category/CategorySection"
// import PopularProducts from "@/components/popular-products/PopularProducts"
// import LatestProducts from "@/components/latest-products/LatestProducts"
// import PromoBanners from "@/components/promo-banners/PromoBanners"
// import AllProducts from "@/components/all-products/AllProducts"
// import Footer from "@/components/footer/Footer"

export default function Home() {
  const { user } = useAuth()

  if (!user) {
    return (
      <main className="min-h-screen">
        <RoleSelection />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20 flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Testing Header Component</h1>
      </div>
    </main>
  )
}