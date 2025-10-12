import Header from "@/components/header/Header"
import Hero from "@/components/hero/Hero"
import CategorySection from "@/components/category/CategorySection"
import PopularProducts from "@/components/popular-products/PopularProducts"
import LatestProducts from "@/components/latest-products/LatestProducts"
import PromoBanners from "@/components/promo-banners/PromoBanners"
import AllProducts from "@/components/all-products/AllProducts"
import Footer from "@/components/footer/Footer"

export default function Home() {
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
