import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Crown, Zap, Headphones, Star } from "lucide-react"

const freeFeatures = [
  "Basic customization tools",
  "Standard fabric options",
  "Regular delivery (7-10 days)",
  "Email support",
  "Basic design templates",
]

const premiumFeatures = [
  "Advanced customization tools",
  "Premium fabric collection",
  "Priority manufacturing (3-5 days)",
  "Live chat & video support",
  "Exclusive design templates",
  "Free shipping on all orders",
  "Design consultation sessions",
  "Bulk order discounts",
  "Early access to new features",
]

export default function PremiumBenefits() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center space-x-2 text-purple-600">
            <Crown className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-wide">Premium Membership</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Unlock Premium Benefits</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get access to exclusive features, priority support, and premium materials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>

            <ul className="space-y-4 mb-8">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" className="w-full bg-transparent">
              Current Plan
            </Button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Premium Plan</h3>
              <div className="text-4xl font-bold mb-2">
                $19<span className="text-xl">/month</span>
              </div>
              <p className="text-purple-200">Everything you need to create amazing designs</p>
            </div>

            <ul className="space-y-4 mb-8">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/premium">
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Priority Manufacturing</h3>
            <p className="text-gray-600">Get your custom orders processed first with 3-5 day turnaround</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Headphones className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Live Support</h3>
            <p className="text-gray-600">Get instant help with chat, audio, and video support from our experts</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Exclusive Access</h3>
            <p className="text-gray-600">Access premium fabrics, templates, and new features before anyone else</p>
          </div>
        </div>
      </div>
    </section>
  )
}
