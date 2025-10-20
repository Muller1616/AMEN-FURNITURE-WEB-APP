//app/page.tsx
"use client"

import { useAuth } from "@/contexts/auth-context"
import RoleSelection from "@/components/auth/role-selection"
import Header from "@/components/header/Header"
import Hero from "@/components/hero/Hero"
import CategorySection from "@/components/category/CategorySection"
import PopularProducts from "@/components/popular-products/PopularProducts"
import LatestProducts from "@/components/latest-products/LatestProducts"
import PromoBanners from "@/components/promo-banners/PromoBanners"
import AllProducts from "@/components/all-products/AllProducts"
import Footer from "@/components/footer/Footer"

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
      <Hero />
      <CategorySection />
      <PopularProducts />
      <LatestProducts />
      <PromoBanners />
      <AllProducts />
      <Footer />
    </main>
  )
}