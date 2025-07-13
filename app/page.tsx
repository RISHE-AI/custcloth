import Hero from "@/components/home/hero"
import FeaturedProducts from "@/components/home/featured-products"
import HowItWorks from "@/components/home/how-it-works"
import PremiumBenefits from "@/components/home/premium-benefits"
import Testimonials from "@/components/home/testimonials"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <HowItWorks />
      <PremiumBenefits />
      <Testimonials />
    </main>
  )
}
